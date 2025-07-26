@@ .. @@
 async function loadStories() {
     try {
         const stories = await apiCall('/stories');
         const container = document.getElementById('storiesFeed');
         container.innerHTML = '';
         
         if (stories.length === 0) {
             container.innerHTML = '<p style="text-align: center; opacity: 0.7;">No stories yet. Share your coding journey!</p>';
             return;
         }
         
         stories.forEach(story => {
             const storyCard = document.createElement('div');
             storyCard.className = 'story-card';
             
             const timeAgo = getTimeAgo(story.createdAt);
             const isLiked = story.likes.includes(currentUser._id || currentUser.id);
             const isRetweeted = story.retweets.includes(currentUser._id || currentUser.id);
             
             const tags = story.tags.map(tag => 
                 `<span class="story-tag">${tag}</span>`
             ).join('');
             
            if (!content || content.trim().length === 0) {
                showError("Story content is required!");
                return;
            }
            
             storyCard.innerHTML = `
                 <div class="story-header">
                     <div class="story-avatar"></div>
                     <div>
                         <div class="story-author">${story.author.username}</div>
                     </div>
                     <div class="story-time">${timeAgo}</div>
                 </div>
                 <div class="story-content">${story.content}</div>
                 <div class="story-tags">${tags}</div>
                 <div class="story-actions">
                     <button class="story-action ${isLiked ? 'liked' : ''}" onclick="toggleLike('${story._id}')">
                         ❤️ ${story.likes.length}
                     </button>
                     <button class="story-action ${isRetweeted ? 'retweeted' : ''}" onclick="toggleRetweet('${story._id}')">
                         🔄 ${story.retweets.length}
                     </button>
                 </div>
             `;
             
             container.appendChild(storyCard);
         });
         
         if (savedToken && savedUser && savedToken !== 'null' && savedUser !== 'null') {
             try {
                 currentUser = JSON.parse(savedUser);
                 showDashboard();
             } catch (error) {
                 console.error('Error parsing saved user data:', error);
                 localStorage.removeItem('authToken');
                 localStorage.removeItem('currentUser');
                 showLandingPage();
             }
         }
     } catch (error) {
         console.error('Error loading stories:', error);
         showError('Failed to load stories');
     }
 }