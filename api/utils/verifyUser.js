import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';
import User from '../models/userModel.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token ) return next(errorHandler(401, 'You are not authanticated'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, "Token is not valid"))

        req.user = user;
        next()
    })
}


export const verifyAdminToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    
    if (!token) return next(errorHandler(401, 'You are not authenticated'));

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET); // Use your secret for user verification
        const user = await User.findById(decoded.id);  // Find the user in DB based on token

        if (!user || !user.isAdmin) {
            return next(errorHandler(403, 'You are not authorized as an admin'));
        }

        req.user = user; // Attach user to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return next(errorHandler(403, "Token is not valid"));
    }
};