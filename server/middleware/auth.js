@@ .. @@
 const auth = async (req, res, next) => {
   try {
     const token = req.header('Authorization')?.replace('Bearer ', '');
     
     if (!token) {
       return res.status(401).json({ message: 'No token, authorization denied' });
     }

     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.userId).select('-password');
     
     if (!user) {
       return res.status(401).json({ message: 'Token is not valid' });
     }

+    // Update user's last seen time
+    user.lastSeen = new Date();
+    user.isOnline = true;
+    await user.save();
+
     req.user = user;
     next();
   } catch (error) {
+    console.error('Auth middleware error:', error);
     res.status(401).json({ message: 'Token is not valid' });
   }
 };