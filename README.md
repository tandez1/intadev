@@ .. @@
 ## 🛠️ Getting Started Locally

 ```bash
 # Clone the repo
 git clone https://github.com/yourusername/instadev.git
 cd instadev

+# Install dependencies
+npm install
+
+# Set up environment variables
+cp .env.example .env
+# Edit .env with your MongoDB URI and JWT secret
+
+# Start MongoDB (make sure MongoDB is installed and running)
+# On macOS with Homebrew: brew services start mongodb-community
+# On Ubuntu: sudo systemctl start mongod
+# On Windows: Start MongoDB service
+
+# Seed the database with sample data (optional)
+npm run seed
+
+# Start the backend server
+npm run server
+
+# In another terminal, start the frontend
+npm run dev
+```
+
+## 📊 Database Setup
+
+The application uses MongoDB as the database. Make sure you have MongoDB installed and running on your system.
+
+### Sample Data
+Run `npm run seed` to populate the database with sample users, projects, and stories for testing.
+
+Sample login credentials:
+- Username: `johndoe`, Password: `password123`
+- Username: `janedeveloper`, Password: `password123`
+- Username: `reactninja`, Password: `password123`

---