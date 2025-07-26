@@ .. @@
         res.json({
             message: 'Login successful',
             token,
             user: {
-                id: user._id,
                _id: user._id,
+                _id: user._id,
                 username: user.username,
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