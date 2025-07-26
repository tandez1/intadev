@@ .. @@
 const mongoose = require('mongoose');

 const projectSchema = new mongoose.Schema({
   title: {
     type: String,
     required: true,
     trim: true,
     maxlength: 100
   },
   description: {
     type: String,
     required: true,
     maxlength: 500
   },
   technologies: [{
     type: String,
     required: true
   }],
   projectLink: {
     type: String,
     trim: true
   },
   demoLink: {
     type: String,
     trim: true
   },
   author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
-  }
+  },
+  likes: [{
+    type: mongoose.Schema.Types.ObjectId,
+    ref: 'User'
+  }],
+  views: {
+    type: Number,
+    default: 0
+  }
 }, {
   timestamps: true
 });

+// Index for better query performance
+projectSchema.index({ author: 1, createdAt: -1 });
+projectSchema.index({ technologies: 1 });
+
 module.exports = mongoose.model('Project', projectSchema);