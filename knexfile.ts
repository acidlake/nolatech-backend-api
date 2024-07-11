import path from "path";
import dotenv from "dotenv";

dotenv.config();

const BASE_PATH = path.join(__dirname, "src", "server", "db");

const config = {
  development: {
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
  },
};

const environment = process.env.NODE_ENV || "development";
const knexConfig = config.development;

export default knexConfig;
