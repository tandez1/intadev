@@ .. @@
 // Create new project
 router.post('/', auth, async (req, res) => {
     try {
         const { title, description, technologies, projectLink, demoLink } = req.body;

+        if (!title || title.trim().length === 0) {
+            return res.status(400).json({ message: 'Project title is required' });
+        }
+
+        if (!description || description.trim().length === 0) {
+            return res.status(400).json({ message: 'Project description is required' });
+        }
+
+        if (!technologies || technologies.trim().length === 0) {
+            return res.status(400).json({ message: 'Technologies are required' });
+        }

         const project = new Project({
-            title,
-            description,
+            title: title.trim(),
+            description: description.trim(),
             technologies: technologies.split(',').map(tech => tech.trim()),
             projectLink,
             demoLink,
             author: req.user._id
         });

         await project.save();
         await project.populate('author', 'username');

         res.status(201).json(project);
     } catch (error) {
         console.error('Create project error:', error);
         res.status(500).json({ message: 'Server error' });
     }
 });