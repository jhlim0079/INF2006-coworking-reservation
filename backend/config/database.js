// config/database.js
const { Sequelize } = require('sequelize');

const dbDialect = process.env.DB_DIALECT || 'sqlite'; // 'sqlite' or 'mariadb'
const dbConfig = {
  dialect: dbDialect,
  storage: process.env.DB_STORAGE || './database.sqlite',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'booking_db',
};

let sequelize;

if (dbDialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbConfig.storage,
  });
} else if (dbDialect === 'mariadb' || dbDialect === 'mysql') {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbDialect,
    }
  );
}

module.exports = sequelize;
