const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const msg = err.name === "TokenExpiredError" ? "Token Expired" : "Invalid Token";
      return res.status(err.name === "TokenExpiredError" ? 401 : 403).json({ message: msg });
    }
    req.user = payload;
    next();
  });
};

const authorizeRoles = (allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user information found' });
  }
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
  }
  next();
};

module.exports = { authenticateToken, authorizeRoles };