CREATE DATABASE IF NOT EXISTS image_processing;

USE image_processing;

CREATE TABLE processingrequests (
    requestId CHAR(36) PRIMARY KEY,
    status VARCHAR(255) DEFAULT 'Pending',
    webhookUrl VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX (status),
    INDEX (createdAt)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serialNumber INT NOT NULL,
    productName VARCHAR(255) NOT NULL,
    inputUrls TEXT NOT NULL,
    outputUrls TEXT,
    processingRequestId CHAR(36),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (processingRequestId) REFERENCES processingrequests(requestId),
    INDEX (productName),
    INDEX (processingRequestId),
    INDEX (createdAt)
);
