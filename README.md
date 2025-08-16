# Mess-Feedback
Mess Survey Feedback



create database mess_feedback;

USE mess_feedback;

CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    ageGroup VARCHAR(50),
    role VARCHAR(50),
    usingMess VARCHAR(10),
    satisfaction VARCHAR(50),
    problems TEXT,
    healthIssues VARCHAR(10),
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
