const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

// This is a template. To use Google Login:
// 1. Create a project in Google Cloud Console
// 2. Add credentials for OAuth 2.0
// 3. Set Redirect URI to http://localhost:5000/api/auth/google/callback
// 4. Update .env with GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

/*
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { googleId: profile.id } });
      if (!user) {
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          isVerified: true
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
*/

// Add routes in authRoutes.js:
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => { ... });
