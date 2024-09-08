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
      thoughtText: '',

    },
  ]



  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
