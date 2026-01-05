📦 Advanced Cloud-Based System Data Recovery

📌 Project Overview



The Advanced Cloud-Based System Data Recovery project is designed to securely store, manage, delete, and recover system data using cloud object storage.

The system uses MinIO (S3-compatible storage) as a private cloud and MySQL for metadata management, enabling reliable and fast recovery of deleted files.



This project simulates real-world disaster recovery systems used in enterprise cloud environments.



🎯 Objectives



To implement cloud-based storage instead of local file systems



To enable safe file recovery using metadata-driven logic



To simulate real disaster recovery mechanisms



To design an industry-standard cloud architecture for data safety



🏗️ System Architecture:



Frontend (Dashboard UI)

&nbsp;       ↓

Backend (Node.js + Express API)

&nbsp;       ↓

MinIO (Cloud Object Storage)

&nbsp;       ↓

MySQL (Metadata \& Recovery State)



🧰 Technology Stack



🔹 Frontend



&nbsp;   HTML5



&nbsp;   CSS3



&nbsp;   JavaScript (ES6)



&nbsp;  Live Server (VS Code Extension)



🔹 Backend

&nbsp;

&nbsp;  Node.js



&nbsp;  Express.js



&nbsp;  Multer (temporary file handling)



&nbsp;  CORS



🔹 Cloud Storage



&nbsp; MinIO (S3-compatible object storage)



🔹 Database



&nbsp;  MySQL



&nbsp;  MySQL Workbench



🔹 Tools



&nbsp;  Visual Studio Code



&nbsp;  PowerShell / Terminal



&nbsp;  MinIO Web Console



&nbsp;  Git \& GitHub



⚙️ Features Implemented

✅ Core Features



File upload to cloud storage (MinIO)



Metadata storage in MySQL



Soft delete (logical deletion)



Cloud-based file recovery



No permanent local file storage



🔁 Recovery Logic



Deleted files are marked using metadata



Actual file remains safe in cloud storage



Recovery restores metadata state instantly



🔐 Data Handling Strategy

Operation	          Location

Upload	                  Temporary local buffer (tmp/)

Permanent Storage	  MinIO Cloud

Recovery	          Metadata-based

Local Storage	          Not used permanently





▶️ How to Run the Project 



1️⃣ Start MinIO Server :

cd C:\\Users\\ASUS\\Desktop

.\\minio.exe server .\\minio-data --console-address ":9001"



MinIO Dashboard:



http://localhost:9001



2️⃣ Start Backend Server :



cd System\_Data\_Recovery\\backend

node src/server.js



3️⃣ Open Frontend :



Open frontend/index.html



Run using Live Server



🧪 Testing Workflow



Upload a file from dashboard



Verify file appears in MinIO bucket



Delete file (soft delete)



Recover file from deleted section



Confirm recovery count updates



🧠 Key Learning Outcomes



Understanding cloud object storage concepts



Implementing S3-compatible storage using MinIO



Designing metadata-driven recovery systems



Applying industry-standard cloud architecture



Using Git for version control



🔮 Future Enhancements



Permanent delete (hard delete)



File download from cloud



MinIO versioning for advanced recovery



Retention policy for automatic cleanup



Encryption before cloud upload



Role-based authentication (Admin/User)



Audit logs \& recovery analytics



🎓 Conclusion



This project demonstrates a real-world cloud-based disaster recovery system using modern technologies.

It eliminates dependency on local storage and ensures data reliability, scalability, and recovery efficiency.



👨‍💻 Developed By



Utkarsh Upadhyay

Final Year Engineering Student



📄 License



This project is for educational and academic purposes only.

