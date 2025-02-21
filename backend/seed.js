const sequelize = require('./config/database'); // Import DB config
const Room = require('./models/Room'); // Import Room model
const User = require('./models/User'); // Import User model
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // This will recreate the tables
    console.log('Database synchronized. Seeding rooms and admin user...');

    // Seed rooms
    await Room.bulkCreate([
      { name: 'Deluxe Suite', price: 250.0, roomType: 'Suite' },
      { name: 'Standard Room', price: 150.0, roomType: 'Standard' },
      { name: 'Economy Room', price: 100.0, roomType: 'Economy' },
      { name: 'Presidential Suite', price: 500.0, roomType: 'Suite' },
      { name: 'Single Room', price: 80.0, roomType: 'Single' },
    ]);

    console.log('Rooms have been seeded successfully!');


    const hashedPassword = await bcrypt.hash('securepassword', 10);

    // Seed admin user
    const adminUser = {
      email: 'admin@example.com',
      password: hashedPassword, // Make sure to hash this password in a real application
      role: 'admin',
    };

    await User.create(adminUser);
    console.log('Admin user has been seeded successfully!');

    process.exit(); // Exit after seeding
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit with error
  }
};

// Run the function
seedDatabase();
