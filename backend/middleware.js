require('dotenv').config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

 //   console.log("AUTHHEADERS=>",authHeader)

    // Check for Bearer token in Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
            msg: "Authorization token missing or invalid"
        });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

   // console.log("TOKEN=>",token, process.env.JWT_SECRET)

    

    try {
        // Verify token and extract payload
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
      //  console.log("decode ",decoded.userId)

        if (decoded.userId) {
            req.userId = decoded.userId; // Attach user ID to request
            next(); // Proceed to next middleware
        } else {
            return res.status(403).json({
                msg: "Token verification failed"
            });
        }
    } catch (err) {
        return res.status(403).json({
            msg: "Token verification failed"
        });
    }
};

module.exports = {
    authMiddleware
};
