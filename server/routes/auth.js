@@ .. @@
         res.json({
             message: 'Login successful',
             token,
             user: {
-                id: user._id,
                _id: user._id,
+                _id: user._id,
                 username: user.username,
    // Validate required fields
    if (!username || !email || !password || !skillLevel || !primaryStack) {
      return res.status(400).json({ message: 'All fields are required' });
    }

                 email: user.email,
                 skillLevel: user.skillLevel,
                 primaryStack: user.primaryStack
             }
         });
     } catch (error) {
         console.error('Login error:', error);
         res.status(500).json({ message: 'Server error during login' });
     }
 };
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    