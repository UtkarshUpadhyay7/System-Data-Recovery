const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const fs = require("fs");
const cors = require("cors");
const Minio = require("minio");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= MYSQL ================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Utkarsh@2004",
  database: "system_data_recovery"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

/* ================= MINIO ================= */
const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin"
});

const BUCKET = "system-data-recovery";


/* ================= MULTER (TEMP STORAGE) ================= */
const upload = multer({ dest: "tmp/" });

/* ================= UPLOAD FILE (CLOUD) ================= */
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const objectName = Date.now() + "_" + file.originalname;

    await minioClient.fPutObject(
      BUCKET,
      objectName,
      file.path
    );

    db.query(
      "INSERT INTO files (filename, filepath, filesize, status) VALUES (?, ?, ?, 'active')",
      [file.originalname, objectName, file.size],
      () => {
        fs.unlinkSync(file.path); // remove temp file
        res.send("✅ File uploaded to cloud storage");
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Cloud upload failed");
  }
});

/* ================= GET ACTIVE FILES ================= */
app.get("/files", (req, res) => {
  db.query("SELECT * FROM files WHERE status='active'", (err, result) => {
    res.json(result);
  });
});

/* ================= SOFT DELETE ================= */
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE files SET status='deleted' WHERE id=?",
    [id],
    () => res.send("🗑 File marked as deleted")
  );
});

/* ================= RECOVER FILE ================= */
// app.post("/recover/:id", (req, res) => {
//   const id = req.params.id;

//   db.query(
//     "UPDATE files SET status='active', recovery_count=recovery_count+1 WHERE id=?",
//     [id],
//     () => res.send("♻ File recovered successfully")
//   );
// });
app.post("/recover/:id", (req, res) => {
  const id = req.params.id;

  const startTime = Date.now(); // RTO start

  db.query(
    "UPDATE files SET status='active', recovery_count=recovery_count+1 WHERE id=?",
    [id],
    () => {
      const endTime = Date.now(); // RTO end
      const rto = endTime - startTime;

      db.query(
        "UPDATE files SET last_recovery_time_ms=? WHERE id=?",
        [rto, id]
      );

      res.send(`♻ File recovered successfully | RTO = ${rto} ms`);
    }
  );
});


/* ================= RPO METRICS ================= */
app.get("/metrics/rpo", (req, res) => {
  db.query(
    "SELECT MAX(uploaded_at) AS last_backup FROM files",
    (err, rows) => {
      if (err) {
        return res.status(500).send("Error calculating RPO");
      }

      if (!rows[0].last_backup) {
        return res.json({
          rpo_ms: 0,
          message: "No files uploaded yet"
        });
      }

      const lastBackupTime = new Date(rows[0].last_backup);
      const rpo = Date.now() - lastBackupTime.getTime();

      res.json({
        last_backup_time: lastBackupTime,
        rpo_ms: rpo
      });
    }
  );
});


/* ================= GET DELETED FILES ================= */
app.get("/deleted", (req, res) => {
  db.query("SELECT * FROM files WHERE status='deleted'", (err, result) => {
    res.json(result);
  });
});

/* ================= START SERVER ================= */
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
