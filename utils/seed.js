const connection = require('../config/connection');
const { Thoughts, User } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    
  const users = [
    {
      username: 'justino',
      email: 'justino@example.com',
    },
    {
      username: 'rosette',
      email: 'rosette@example.com',
    },
    {
      username: 'maiko',
      email: 'maiko@example.com',
    }
  ];

  const thoughts = [
    {
      thoughtText: 'This is my first thought!',
      username: 'justino',
      reactions: [
        {
          reactionBody: 'Great thought!',
          username: 'rosette'
        },
        {
          reactionBody: 'I agree!',
          username: 'maiko'
        }
      ]
    },
    {
      thoughtText: 'Coding is fun!',
      username: 'rosette',
      reactions: [
        {
          reactionBody: 'Interesting perspective.',
          username: 'justino'
        }
      ]
    },
    {
      thoughtText: 'I love the weekend!',
      username: 'maiko',
      reactions: []
    }
  ];
  
  const seedDatabase = async () => {
    try {
      // Delete existing data
      await User.deleteMany({});
      await Thoughts.deleteMany({});
  
      // Create users
      const createdUsers = await User.create(users);
  
      // Create thoughts and associate them with users
      const createdThoughts = await Thoughts.create(thoughts);
  
      // Add thoughts to users
      for (const thought of createdThoughts) {
        const user = await User.findOne({ username: thought.username });
        user.thoughts.push(thought._id);
        await user.save();
      }
  
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    } 
  };
  
  await seedDatabase();

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
