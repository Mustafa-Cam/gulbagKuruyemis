const mysql = require('mysql2');

const connection = mysql.createConnection({
host: 'localhost',
port: 3306,
user: 'root',
  password: 'Mustafa58çam',
  database: 'gulbagkuruyemis',
  // connectionLimit: 10
});
// const connection = pool.promise();
// console.log('MySQL veritabanına bağlandı');

connection.connect((err) => {
  if (err) {
    console.error('MySQL bağlantı hatası:', err);
    return;
  }
  console.log('MySQL veritabanına bağlandı');
});

// Kullanıcı oluşturma
const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const { ad,email,telefon, sifre } = user;
    const query = 'INSERT INTO users (usersname,usersemail,tel, sifre) VALUES (?,?,?,?)';
    const values = [ad,email,telefon,sifre];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Kullanıcıyı e-posta adresine göre getir
const getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE usersemail = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const user = results[0];
      callback(null, user);
    }
  });
};

// Kullanıcıyı kimlik numarasına göre getir
const getUserById = (id, callback) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const user = results[0];
      callback(null, user);
    }
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById
};
 

  
   

