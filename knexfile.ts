import path from "path";
import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config();

const BASE_PATH = path.join(__dirname, "src", "server", "db");

const development: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: process.env.DATABASE_SQLITE_NAME || "./dev.sqlite3",
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(BASE_PATH, "migrations"),
  },
  seeds: {
    directory: path.join(BASE_PATH, "seeds"),
  },
};

const production: Knex.Config = {
  client: "pg",
  version: "7.2",
  connection: {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.DATABASE_SSL ? { rejectUnauthorized: false } : false,
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(BASE_PATH, "migrations"),
  },
  seeds: {
    directory: path.join(BASE_PATH, "seeds"),
  },
};

const config = {
  development,
  production,
};

const environment = process.env.NODE_ENV || "development";
const knexConfig: Knex.Config = config[environment as keyof typeof config];

export default knexConfig;
