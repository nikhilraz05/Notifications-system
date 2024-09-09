// File: models/migrate-mongo-config.mjs

import dotenv from 'dotenv';
dotenv.config();

export default {
  mongodb: {
    url: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Notifications-system", // Fetch connection string from environment variables
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: "models/migrations", // Directory where migration files will be stored
  changelogCollectionName: 'changelog', // Collection to track migration state
  migrationFileExtension: '.js', // File extension for migration files
  moduleSystem: 'esm',
};

