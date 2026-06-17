const express = require('express');
const router = express.Router();
const passport = require('passport');

// GET /auth/github — redirect to GitHub for OAuth login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GET /auth/github/callback — GitHub redirects here after login
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login-failed' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// GET /auth/profile — show logged-in user info (protected)
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: 'Not logged in',
      message: 'Visit /auth/github to log in with GitHub.',
    });
  }
  res.status(200).json({
    message: 'You are logged in',
    user: {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName,
    },
  });
});

// GET /auth/logout — log the user out
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// GET /auth/login-failed
router.get('/login-failed', (req, res) => {
  res.status(401).json({ error: 'GitHub OAuth login failed. Please try again.' });
});

module.exports = router;
