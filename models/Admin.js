if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DATABASE_SIFRE,
  database: 'gulbagkuruyemis'
});

const Admin = {
  findByAdminemail: (email, callback) => {
    db.query('SELECT * FROM admin WHERE adminemail = ?', [email], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const user = results[0];
      callback(null, user);
    });
  },
  findById: (id, callback) => {
    db.query('SELECT * FROM admin WHERE id = ?', [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      const user = results[0];
      callback(null, user);
    });
  }
};

module.exports = Admin;
