"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_PATH = path_1.default.join(__dirname, "src", "server", "db");
const development = {
    client: "sqlite3",
    connection: {
        filename: process.env.DATABASE_SQLITE_NAME || "./dev.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
        directory: path_1.default.join(BASE_PATH, "migrations"),
    },
    seeds: {
        directory: path_1.default.join(BASE_PATH, "seeds"),
    },
};
const production = {
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
        directory: path_1.default.join(BASE_PATH, "migrations"),
    },
    seeds: {
        directory: path_1.default.join(BASE_PATH, "seeds"),
    },
};
const config = {
    development,
    production,
};
const environment = process.env.NODE_ENV || "development";
const knexConfig = config[environment];
exports.default = knexConfig;
