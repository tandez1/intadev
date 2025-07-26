@@ .. @@
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const dotenv = require('dotenv');

 // Load environment variables
 dotenv.config();

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