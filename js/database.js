require('dotenv').config()
const mysql = require('mysql2')


const db = mysql.createConnection({
    host: 'localhost',
    // port: 3306,
    user: 'root',
    password:process.env.DATABASE_SIFRE,
    database: 'gulbagkuruyemis'
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');
  });
    module.exports = db;

