const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    database: 'bankapp',
    password: 'mysql123'
})

module.exports = pool.promise();