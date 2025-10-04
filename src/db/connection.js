const mysql2 = require('mysql2/promise');

const connection = mysql2.createPool({
  host: process.env.MYSQL_HOSTNAME || 'database',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'TalkerDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;