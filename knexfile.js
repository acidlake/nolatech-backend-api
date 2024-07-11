const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const BASE_PATH = path.join(__dirname, "src", "server", "db");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

let options = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: process.env.DATABASE_SQLITE_NAME || "./dev.sqlite3",
    },
    migrations: {
      tableName: "knex_mgirations",
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE_NAME || "my_db",
      user: process.env.DATAASE_USER || "username",
      password: process.env.DATABASE_PASSWORD || "password",
    },
    pool: {
      min: parseInt(process.env.DATABASE_MIN_POOL) || 1,
      max: parseInt(process.env.DATA_MAX_POOL) || 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE_NAME || "my_db",
      user: process.env.DATAASE_USER || "username",
      password: process.env.DATABASE_PASSWORD || "password",
    },
    pool: {
      min: parseInt(process.env.DATABASE_MIN_POOL) || 2,
      max: parseInt(process.env.DATA_MAX_POOL) || 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
};

let environment = process.env.NODE_ENV;
let config = options[environment];

module.exports = config;
