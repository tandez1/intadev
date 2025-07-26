const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Project = require('../models/Project');
const Story = require('../models/Story');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Story.deleteMany({});
    console.log('Cleared existing data...');

    // Create sample users
    const users = [
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        skillLevel: 'intermediate',
        primaryStack: 'mern',
        isOnline: true
      },
      {
        username: 'janedeveloper',
        email: 'jane@example.com',
        password: 'password123',
        skillLevel: 'advanced',
        primaryStack: 'django',
        isOnline: true
      },
      {
        username: 'codewizard',
        email: 'wizard@example.com',
        password: 'password123',
        skillLevel: 'expert',
        primaryStack: 'java',
        isOnline: false
      },
      {
        username: 'reactninja',
        email: 'react@example.com',
        password: 'password123',
        skillLevel: 'advanced',
        primaryStack: 'mern',
        isOnline: true
      },
      {
        username: 'pythonista',
        email: 'python@example.com',
        password: 'password123',
        skillLevel: 'intermediate',
        primaryStack: 'django',
        isOnline: true
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Created sample users...');

    // Create sample projects
    const projects = [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform with React frontend and Node.js backend',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        projectLink: 'https://github.com/johndoe/ecommerce',
        demoLink: 'https://myecommerce.netlify.app',
        author: createdUsers[0]._id
      },
      {
        title: 'Task Management App',
        description: 'A Django-based task management application with REST API',
        technologies: ['Django', 'Python', 'PostgreSQL', 'React'],
        projectLink: 'https://github.com/janedeveloper/taskmanager',
        author: createdUsers[1]._id
      },
      {
        title: 'Weather Dashboard',
        description: 'Real-time weather dashboard using Spring Boot and Angular',
        technologies: ['Java', 'Spring Boot', 'Angular', 'MySQL'],
        projectLink: 'https://github.com/codewizard/weather-app',
        demoLink: 'https://weather-dash.herokuapp.com',
        author: createdUsers[2]._id
      }
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log('Created sample projects...');

    // Create sample stories
    const stories = [
      {
        content: 'Just finished building my first full-stack application! The feeling of seeing everything work together is amazing. #MERN #FirstProject',
        author: createdUsers[0]._id,
        tags: ['#mern', '#firstproject'],
        likes: [createdUsers[1]._id, createdUsers[3]._id]
      },
      {
        content: 'Django REST framework is incredibly powerful for building APIs. The built-in authentication and permissions make development so much faster! #Django #API',
        author: createdUsers[1]._id,
        tags: ['#django', '#api'],
        likes: [createdUsers[0]._id, createdUsers[4]._id],
        retweets: [createdUsers[4]._id]
      },
      {
        content: 'After 10 years of coding, I still get excited about learning new technologies. Currently diving deep into microservices architecture. #NeverStopLearning',
        author: createdUsers[2]._id,
        tags: ['#neverstoplearning'],
        likes: [createdUsers[0]._id, createdUsers[1]._id, createdUsers[3]._id]
      },
      {
        content: 'React Hooks have completely changed how I think about state management. useEffect is my new best friend! #React #Hooks',
        author: createdUsers[3]._id,
        tags: ['#react', '#hooks'],
        likes: [createdUsers[0]._id]
      },
      {
        content: 'Python\'s simplicity never ceases to amaze me. What takes 20 lines in other languages can be done in 5 lines with Python! #Python #CleanCode',
        author: createdUsers[4]._id,
        tags: ['#python', '#cleancode'],
        likes: [createdUsers[1]._id, createdUsers[2]._id]
      }
    ];

    await Story.insertMany(stories);
    console.log('Created sample stories...');

    // Add some friendships
    createdUsers[0].friends.push(createdUsers[1]._id, createdUsers[3]._id);
    createdUsers[1].friends.push(createdUsers[0]._id, createdUsers[4]._id);
    createdUsers[3].friends.push(createdUsers[0]._id);
    createdUsers[4].friends.push(createdUsers[1]._id);

    await Promise.all([
      createdUsers[0].save(),
      createdUsers[1].save(),
      createdUsers[3].save(),
      createdUsers[4].save()
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('Sample users created:');
    console.log('- johndoe (password: password123)');
    console.log('- janedeveloper (password: password123)');
    console.log('- codewizard (password: password123)');
    console.log('- reactninja (password: password123)');
    console.log('- pythonista (password: password123)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;