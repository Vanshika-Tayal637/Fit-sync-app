-- Create database
CREATE DATABASE fitsync;
USE fitsync;

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

-- Exercises table
CREATE TABLE  exercises (
    exercise_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    body_part VARCHAR(50),
    target_muscle VARCHAR(50),
    equipment VARCHAR(50),
    gif_url TEXT,
    instructions TEXT
);

-- Saved exercises table
CREATE TABLE  saved_exercises (
    user_id INT,
    exercise_id VARCHAR(50),
    PRIMARY KEY (user_id, exercise_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);

-- Routines table
CREATE TABLE  routines (
    routine_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    routine_name VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Routine exercises linking table
CREATE TABLE  routine_exercises (
    routine_id INT,
    exercise_id VARCHAR(50),
    sequence_order INT,
    PRIMARY KEY (routine_id, exercise_id),
    FOREIGN KEY (routine_id) REFERENCES routines(routine_id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);

-- User metrics table
CREATE TABLE user_metrics (
    metric_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    weight DECIMAL(5,2),
    strength_level VARCHAR(50),
    cardio_level VARCHAR(50),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- User profiles table
CREATE TABLE  user_profiles (
    user_id INT PRIMARY KEY,
    profile_pic_url TEXT,
    description TEXT,
    goals TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
