if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require('express');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);
const LocalStrategy = require('passport-local').Strategy;
// const opn = require('opn');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
// const database = require('./utility/database');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const methodOverride = require('method-override')

// const getcartitems =require("./public/js/main")

const app = express();

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


// middleare kısmı
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))
app.use(flash())

const sessionStore = new MySQLStore({
  expiration: 86400000, // Oturumun geçerlilik süresi (ms)
  createDatabaseTable: true, // Oturum tablosunu otomatik olarak oluşturur
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  },
  host: 'localhost',
  // port: 3306,
  user: 'root',
  password:process.env.DATABASE_SIFRE,
  database: 'gulbagkuruyemis'
});



app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store:sessionStore
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(express.static('public'));
app.set('view engine', 'ejs');

const path = require('path');
app.set('views', path.join(__dirname, 'views'));

const User = require('./models/User');


//! Passport yerel kimlik doğrulama stratejisi ayarları
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      // Kullanıcıyı veritabanından bulun
      User.findByUseremail(email, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Geçersiz kullanıcı adı veya şifre' });
          
        }

        // Şifre doğrulaması yapın
        bcrypt.compare(password, user.sifre, (err, result) => {
          if (err) {
            return done(err);
          }
          if (result) {
            return done(null, user);
          }
          return done(null, false, { message: 'Geçersiz kullanıcı adı yada şifre' });
        });
      });
    }
  )
);


// Oturum yönetimi için kullanıcıyı oturuma ekleyin
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Kullanıcıyı veritabanından alın
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


//#region uyegiriş sql sorgu kısmı
// app.post("/uyegiris",checkNotAuthenticated,passport.authenticate("local",{
//   successRedirect:"/",
//   failureRedirect:"girisYap",
//   failureFlash:true
// })
// )
//#endregion

//#region
// app.post('/uyegiris', checkNotAuthenticated, (req, res) => {
//   const {eposta,sifre  } = req.body;

//   const query = 'SELECT * FROM users WHERE usersemail = ? and sifre = ?';
//   const values = [eposta, sifre]; 

//   database.query(query, values, (err, result) => {
//     if (err) {
//       console.error('Veri kaydedilirken bir hata oluştu:', err);
//       res.status(500).send('Veri kaydedilirken bir hata oluştu');
//       return;
//     }
//     console.log('giris yapildi');
//     // res.send('Üyelik başarıyla tamamlandı');
//   });
// });
//#endregion

// const initializePassport = require('./passportConfig')
// initializePassport(passport,database.getUserByEmail ,database.getUserById)


//uyelik için 

app.post('/register',async (req, res) => {
  //!veri tabaı olmadan yapılan kısım const = [] şeklinde
  //#region 
  // const { ad, email, telefon } = req.body;
  // const hashedPassword = await bcrypt.hash(req.body.sifre, 10) 

  // // E-posta veya telefon numarasının veritabanında var olup olmadığını kontrol etmek için sorgu yapın
  // const query = 'SELECT * FROM users WHERE usersemail = ? OR tel = ?';
  // const values = [email, telefon];

  // database.query(query, values, (err, result) => {
  //   console.log(result);
  //   if (err) {
  //     console.error('Veritabanı hatası:', err);
  //     res.status(500).send('Bir hata oluştu');
  //     return;
  //   }

  //   // E-posta veya telefon numarasının veritabanında var olup olmadığını kontrol edin
  //   if (result.length > 0) {
  //   console.log(result);
  //     res.status(400).send('Bu e-posta veya telefon numarası zaten kullanılıyor');
  //     return;
  //   }

  //   // Eğer veritabanında eşleşme yoksa, yeni üyeyi veritabanına ekleyin
  //   const insertQuery = 'INSERT INTO users (usersname, usersemail, tel, sifre) VALUES (?, ?, ?, ?)';
    
  //   const insertValues = [ad, email, telefon, hashedPassword];

  //   database.query(insertQuery, insertValues, (insertErr, insertResult) => {
  //     if (insertErr) {
  //       console.error('Üyelik kaydedilirken bir hata oluştu:', insertErr);
  //       res.status(500).send('Üyelik kaydedilirken bir hata oluştu');
  //       return;
  //     }

  //     console.log('Üyelik kaydedildi');
  //     res.send('Üyelik kaydedildi');
  //   });
  // });
  //#endregion

  //!chatgpt kısmı
  // try {
  //   const {ad,email,telefon,sifre } = req.body;
  //   const hashedPassword = await bcrypt.hash(sifre, 10);
  //   const user = {ad, email, telefon,sifre: hashedPassword };

  //   await database.createUser(user);
  //   res.redirect('/girisYap');
  // } catch (error) {
  //   console.error(error);
  //   res.redirect('/uyeOl');
  //}

  const { username,email,telefon,password } = req.body;

  // Şifreyi hashleyin
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    }

    // Kullanıcıyı veritabanına kaydedin
    db.query('INSERT INTO users (usersname, usersemail,tel,sifre) VALUES (?, ?,?,?)', [username,email,telefon, hash], (err) => {
      if (err) {
        throw err;
      }
      res.redirect('/login');
    });
  });

});

// Kullanıcı girişi
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
})
); 

// Kullanıcı oturumu açma kontrolü
const requireLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

app.post("/update",(req, res) => {
  const {email,tel,address} = req.body;
  // db.query('INSERT INTO profiles (profilemail, profiletel,profilestreet) values(?,?,?)',[email,tel,address],(err)=>{
  //   if(err){
  //     throw err;
  //   }
  // })
  const useremail =req.user.usersemail;
  const updateusers=`
  update users set usersemail=${db.escape(email)},tel=${db.escape(tel)},address=${db.escape(address)} where usersemail=${db.escape(useremail)}
  `
  db.query(updateusers,(err,result)=>{
    if (err) {
      throw err;
    }
  })
  res.redirect("/profile")
})


//#region authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { //burda oturum açılmış ise sonraki adıma geç açılmamış ise login sayfasına dön demek istenmiş
    return next()
  }
  res.redirect('/girisYap')
}

function checkNotAuthenticated(req, res, next){
  if (req.isAuthenticated()) { // burda oturum açılmış ise ana sayfaya dön açılmamış ise sonraki adıma geç denmek istenmiş
    return res.redirect('/')
  }
  next()
}
//#endregion


app.get('/dashboard', requireLogin, (req, res) => {
  var islogin=req.isAuthenticated();
  res.render('uyegiris/dashboard', { user: req.user,islogin });
});

app.get('/logout', (req, res) => {
  req.logout((err)=>{
    if(err){
      console.log(err)
    }
    res.redirect('/login');
  });
});

let sepet =[];
app.post('/ekle', (req, res) => {
  const { amount, price,name } = req.body;

  // Yeni ürün nesnesini sepete ekleyelim
  sepet.push({ amount, price,name });
  console.log(sepet)
  // Sepet sayfasına yönlendirme
  res.redirect('/sepet');
});

app.get('/sil/:index', (req, res) => {
  const index = req.params.index;

  // Belirtilen index'teki ürünü sepetten çıkaralım
  sepet.splice(index, 1);

  // Sepet sayfasına yönlendirme
  res.redirect('/sepet');
});

app.get('/sepet', (req, res) => {
  res.render('sepet', { sepet: sepet });
});

app.get('/profile',requireLogin ,(req, res) => {
  
  if(req.isAuthenticated()){
    
    const email = req.user.usersemail;
    db.query('select usersname,usersemail,tel,address from users where usersemail=?',[email],(err, result) => {
      if(err){
        throw err;
      }
      if(result.length > 0){
        
        console.log(result[0]);
        res.render('profile',result[0]);
      }
    })
  }
});

app.get('/' ,(req, res) => {
  var islogin=req.isAuthenticated();
  res.render('index', { islogin: islogin, sepet: sepet });
});

app.get('/login', (req, res) => {
  res.render('uyegiris/login.ejs'); 
});

app.get('/register' , (req, res) => {
  res.render('uyegiris/register.ejs'); 
});

app.get('/products' , (req, res) => {
  res.render('/products');
});

app.get('/product/:deger',requireLogin,(req, res) => {
  const deger =req.params.deger;
  var islogin=req.isAuthenticated();

  res.render(`products/${deger}`,{islogin: islogin, sepet: sepet});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // const url = `http://localhost:${port}`;
  console.log('Server is running on port 3000');
  // opn(url);
});
