import jwt from "jsonwebtoken";
import User from '../models/User.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        // 1. Get token from cookies (should be req.cookies, not res.cookies)
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(431).json({ message: "Unauthorized - No token provided" });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // 3. Find user (excluding password)
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(421).json({ message: "Unauthorized - User not found" });
        }

        // 4. Attach user to request
        req.user = user;
        
        // 5. Call next middleware
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        
        // Handle specific JWT errors
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(402).json({ message: "Unauthorized - Invalid token" });
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(411).json({ message: "Unauthorized - Token expired" });
        }
        
        res.status(500).json({ message: "Internal Server Error" });
    }
};