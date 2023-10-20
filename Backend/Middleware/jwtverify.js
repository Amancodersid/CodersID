const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ status: false, message: 'Access denied. Token is required.|| Login first' });
  }

  try {
    const decoded = jwt.verify(token, 'shhhhh');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ status: false, message: 'Invalid token' });
  }
};

module.exports = {verifyToken};
