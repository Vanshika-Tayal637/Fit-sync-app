#  FitSync – Workout Tracker Web App

**FitSync** is a dynamic, full-stack fitness tracking application that empowers users to register, explore exercises, and track their progress. It combines the power of Node.js, Express, MySQL, and the ExerciseDB API to provide a functional and secure workout management experience.

---

##  Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Setup Instructions](#-setup-instructions)
- [Database Schema](#-database-schema)
- [Known Issues](#-known-issues)
- [Future Enhancements](#-future-enhancements)
- [Team](#-team)

---

##  Features

- ✅ Secure user registration with password hashing
- ✅ Login system with redirection to a personalized home page
- ✅ Users can view and filter exercises by body part
- ✅ Exercise data fetched via [ExerciseDB API]
- ✅ Users can save their favorite workouts
- ✅ Users can view and delete saved workouts
- ✅ SQL injection protection implemented for database queries
- ✅ Modular backend using Express.js routing and MySQL connection pooling
- ✅ Responsive user interface using HTML, CSS, and JavaScript
- ✅ Application is optimiszed and database queies are efficient

❌ **Note:** Workout tracker (logging sets/reps/weight)/ Profile Page (adding profile image,dark mode) is currently not functional and but still included.

---

##  Tech Stack

| Layer         | Technology              |
|---------------|-------------------------|
| Frontend      | HTML, CSS, JavaScript   |
| Backend       | Node.js, Express.js     |
| Database      | MySQL                   |
| API           | ExerciseDB              |
| Security      |  (password hashing), SQL Injection prevention |
| Hosting (Dev) | Localhost               |

---

##  Setup Instructions

### Prerequisites

- Node.js installed (v14+)
- MySQL server running 
- Git installed

### Step-by-step

```bash
# 1. Clone the repository from GitHub (Group52) and reopen in the dev container 

# 2. If the express server is not installed do this: 
npm install
npm install express-session

# 3. Import database schema into MySQL
# Use the schema.sql file provided in the repo
```
# if starting the mysql server follow these steps:
service mysql start
mysql
exit

```bash
# 4. Start the application
npm start
```
Note: Recommended to use 2 different terminals for sql and node modules

Access the app at [http://localhost:yourport](http://localhost:yourport)

---

##  Database Schema Overview

```sql
-- Create database
CREATE DATABASE fitsync;
USE fitsync;

-- Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Exercises table
CREATE TABLE exercises (
    exercise_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    body_part VARCHAR(50),
    target_muscle VARCHAR(50),
    equipment VARCHAR(50),
    gif_url TEXT,
    instructions TEXT
);

-- Saved exercises table
CREATE TABLE saved_exercises (
    user_id INT,
    exercise_id VARCHAR(50),
    PRIMARY KEY (user_id, exercise_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE
);

-- Routines table
CREATE TABLE routines (
    routine_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    routine_name VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Routine exercises linking table
CREATE TABLE routine_exercises (
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
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,
    profile_pic_url TEXT,
    description TEXT,
    goals TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

---


##  Known Issues

- Workout tracker for logging sets/reps/weight is not functioning
- Limited frontend input validation
- UI is not yet mobile optimized(for future recommendations)
- profile page included but not functional yet
- dark mode button included, not functional yet

---

##  Future Enhancements

- Implement working workout tracker with sets/reps/weight
- Add authentication middleware and session management
- Improve UI/UX for mobile responsiveness
- Enable social features (routine sharing, community challenges)
- make the profile page and dark mode functional 

---


##  Team

- **Vanshika Tayal** – Backend/database integration/Frontend
- **Lovishdeep Singh** – API & HTML/CSS
- **Wade Mustoe** – Frontend JS/HTML/CSS
- **Tom George** – Backend/API integration

---

