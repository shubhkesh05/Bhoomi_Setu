import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//i marked 
// ✅ Named export
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is missing or malformed
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
   req.user = await User.findById(decoded.id).select('-password');
    // Attach user info to the request
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// export default authenticate;


