-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS popsopt;

-- 생성한 데이터베이스 사용
USE popsopt;

-- popups 테이블 생성
CREATE TABLE IF NOT EXISTS popups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    publicUrl VARCHAR(2083),
    imagePath VARCHAR(255),
    views INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);