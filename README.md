# Full Stack Rating App – Internship Assignment

This is my submission for the Full Stack Internship assignment.

Tech Stack:
- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MySQL
- Authentication: JWT (JSON Web Token)

✅ Features Completed:
- User registration and login (JWT based)
- Role-based access (admin, user, owner)
- MySQL schema with relationships (users, stores, ratings)
- Backend APIs for each role
- Frontend pages for login/register and dashboards
- User can rate stores
- Admin can view/add users & stores
- Store owner can view received ratings and average

🚧 Pending (due to time limit):
- Admin filtering and UI polish
- Store owner analytics
- UI styling

🛠️ How to Run the Project Locally:

1. Clone the repository:
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. MySQL Setup:
   - Start MySQL (via CLI or Workbench)
   - Create database and tables using this SQL:

   CREATE DATABASE IF NOT EXISTS rating_app;
   USE rating_app;

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(60) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       address VARCHAR(400),
       role ENUM('admin', 'user', 'owner') NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE stores (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(60) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       address VARCHAR(400),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE ratings (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       store_id INT NOT NULL,
       rating_value INT CHECK (rating_value BETWEEN 1 AND 5),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       UNIQUE KEY unique_rating (user_id, store_id),
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
       FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
   );

3. Backend Setup:
   cd server
   npm install

   Create a .env file inside /server with:

   PORT=5000
   JWT_SECRET=mySuperSecret123@!
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_mysql_password
   DB_NAME=rating_app

   Start server:
   node server.js

4. Frontend Setup:
   cd ../client
   npm install
   npm start

   App will run on http://localhost:3000

🌐 Routes:
- /register → for user/store-owner signup
- /login → login for all roles
- /admin → admin dashboard
- /user → user dashboard
- /owner → store owner dashboard


Thank you for reviewing this assignment Looking forward to your feedback.
