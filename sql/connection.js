const mysql = require('mysql2')
require('dotenv').config()

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating mysql connection...')

      const config = {
        connectionLimit: 100,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
      }

      if (process.env.NODE_ENV === 'production' && process.env.CLOUD_INSTANCE) {
        console.log(`connect socket: ${process.env.CLOUD_INSTANCE}`)
        config.socketPath = `/cloudsql/${process.env.CLOUD_INSTANCE}`
      }

      this.pool = mysql.createPool(config)

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;