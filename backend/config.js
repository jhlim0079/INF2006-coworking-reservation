// config.js
const path = require('path');

module.exports = {
  db: {
    client: process.env.DB_CLIENT || 'sqlite3', // Default to sqlite3
    connection:
      (process.env.DB_CLIENT || 'sqlite3') === 'sqlite3'
        ? { filename: process.env.SQLITE_FILENAME || path.join(__dirname, 'hotel.db') }
        : {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'yourusername',
            password: process.env.DB_PASSWORD || 'yourpassword',
            database: process.env.DB_NAME || 'hoteldb'
          },
    useNullAsDefault: (process.env.DB_CLIENT || 'sqlite3') === 'sqlite3',
  },
  adminSecret: process.env.ADMIN_SECRET || 'adminsecret'
};
