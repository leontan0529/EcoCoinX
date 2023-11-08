const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-crypto-com');
const cryptoComClient = require('crypto-com-client'); 
const Web3 = require('web3');

const app = express();

//For identity verification
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Strategy({
    clientID: 'your-crypto-com-client-id',
    clientSecret: 'your-crypto-com-client-secret',
    callbackURL: 'http://localhost:3000/auth/callback', /* http://domain:port/auth/callback */
  },
  (accessToken, refreshToken, profile, done) => {
    // Handle user data and store it as needed
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Crypto.com login example. <a href="/auth">Log In with Crypto.com</a>');
});

app.get('/auth', passport.authenticate('crypto-com'));

app.get('/auth/callback', passport.authenticate('crypto-com', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Logged in with Crypto.com. User data: ' + JSON.stringify(req.user));
  } else {
    res.redirect('/');
  }
});




