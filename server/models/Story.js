@@ .. @@
 const mongoose = require('mongoose');

 const storySchema = new mongoose.Schema({
   content: {
     type: String,
     required: true,
     maxlength: 500
   },
   author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
   },
   tags: [{
     type: String,
     trim: true
   }],
   likes: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   }],
   retweets: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
-  }]
+  }],
+  comments: [{
+    author: {
+      type: mongoose.Schema.Types.ObjectId,
+      ref: 'User',
+      required: true
+    },
+    content: {
+      type: String,
+      required: true,
+      maxlength: 200
+    },
+    createdAt: {
+      type: Date,
+      default: Date.now
+    }
+  }]
 }, {
   timestamps: true
 });

+// Index for better query performance
+storySchema.index({ author: 1, createdAt: -1 });
+storySchema.index({ tags: 1 });
+storySchema.index({ createdAt: -1 });
+
 module.exports = mongoose.model('Story', storySchema);