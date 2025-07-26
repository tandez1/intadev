@@ .. @@
 const express = require('express');
 const cors = require('cors');
 const dotenv = require('dotenv');
const connectDB = require('./config/database');

 // Load environment variables
 dotenv.config();

// Connect to MongoDB
connectDB();

 const app = express();
 const PORT = process.env.PORT || 5000;

 // Middleware
-app.use(cors());
+app.use(cors({
+    origin: process.env.NODE_ENV === 'production' 
+        ? ['https://instadev00.netlify.app'] 
+        : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
+    credentials: true
+}));
 app.use(express.json());