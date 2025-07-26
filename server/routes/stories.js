@@ .. @@
 // Create new story
 router.post('/', auth, async (req, res) => {
     try {
         const { content, tags } = req.body;

+        if (!content || content.trim().length === 0) {
+            return res.status(400).json({ message: 'Story content is required' });
+        }
+
+        if (content.length > 500) {
+            return res.status(400).json({ message: 'Story must be 500 characters or less' });
+        }

         const story = new Story({
             content,
-            tags: tags ? tags.split(' ').filter(tag => tag.startsWith('#')) : [],
+            tags: tags ? tags.split(/\s+/).filter(tag => tag.startsWith('#')).map(tag => tag.toLowerCase()) : [],
             author: req.user._id
         });

         await story.save();
         await story.populate('author', 'username');

         res.status(201).json(story);
     } catch (error) {
         console.error('Create story error:', error);
         res.status(500).json({ message: 'Server error' });
     }
 });