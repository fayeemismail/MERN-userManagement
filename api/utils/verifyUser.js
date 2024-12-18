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
        
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET); 
        const user = await User.findById(decoded.id);  

        if (!user || !user.isAdmin) {
            return next(errorHandler(403, 'You are not authorized as an admin'));
        }

        req.user = user; 
        next(); 
    } catch (err) {
        return next(errorHandler(403, "Token is not valid"));
    }
};