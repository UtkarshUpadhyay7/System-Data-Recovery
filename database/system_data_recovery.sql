CREATE DATABASE system_data_recovery;
USE system_data_recovery;

CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255),
  filepath VARCHAR(255),
  filesize BIGINT,
  upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20),
  recovery_count INT DEFAULT 0
);
