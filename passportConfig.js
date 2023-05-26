//! BU DOSYAYI KULLANMADIK APP.JS DE YAPTIK BU İŞLEMLERİ USERNAMEFİELD:USERNAME YAZDIĞI İÇİN HATALI ZANNEDİYORDUM AMA EMAİL YAZMALIYDIK BU DOSYA ÖRNEK OLARAK VARDIR 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./utility/database');

passport.use(new LocalStrategy(
  { usernameField: 'email' }, 
  async (email, password, done) => {
    try {
      const user = await db.getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      const passwordMatch = await bcrypt.compare(password, user.sifre);
      if (!passwordMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
