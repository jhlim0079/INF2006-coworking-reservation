// initDb.js

// Run node initDb.js for migrations

const db = require('./db');

async function createTables() {
  // Users table
  if (!(await db.schema.hasTable('users'))) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.boolean('isAdmin').defaultTo(false);
    });
    console.log('Created table: users');
  }

  // Rooms table
  if (!(await db.schema.hasTable('rooms'))) {
    await db.schema.createTable('rooms', (table) => {
      table.increments('id').primary();
      table.string('location').notNullable();
      table.decimal('price').notNullable();
    });
    console.log('Created table: rooms');
  }

  // Bookings table
  if (!(await db.schema.hasTable('bookings'))) {
    await db.schema.createTable('bookings', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('location').notNullable();
      table.date('booking_date').notNullable();
    });
    console.log('Created table: bookings');
  }
  process.exit(0);
}

createTables().catch((err) => {
  console.error(err);
  process.exit(1);
});
