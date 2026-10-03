// Middleware to protect routes — requires GitHub OAuth login
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: 'Unauthorized',
    message: 'You must be logged in to access this route. Please visit /auth/github to authenticate.',
  });
}

module.exports = { isAuthenticated };
