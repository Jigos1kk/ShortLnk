'use strict'

require('dotenv').config();
const config_db = {
  "development": {
    "username": process.env.POSTGRES_USER || "root",
    "password": process.env.POSTGRES_PASSWORD || "n6pJ5TMwL8RUzkhe",
    "database": process.env.POSTGRES_DB || "short_lnk",
    "host": process.env.POSTGRES_HOST || "localhost",
    "dialect": "postgres"
  }
}

module.exports = config_db;