import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: "User registered successfully", user: { username, email } });
    } catch (error) {
        next(error)
    }
}


export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User Not Found'));
        if(!password) return next(errorHandler(401, 'password required'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid Credentials'));
        if(validUser.isBlocked) return next(errorHandler(403, 'You are Blocked'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}



export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            
            if (user.isBlocked) {
                return res.status(403).json({ message: "Your account is blocked." });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);

            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
                isBlocked: false 
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000);

            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const signout = async (req, res) => {
    res.clearCookie('access_token').status(200).json('Sign Out success')
};



export const adminSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const validAdmin = await User.findOne({ email });
        if (!validAdmin) return next(errorHandler(404, 'Not Found'));
        const validPassword = bcryptjs.compareSync(password, validAdmin.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid Credentials'));
        if (!validAdmin.isAdmin) return next(errorHandler(401, "You are not a admin"));
        const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_ADMIN_SECRET);
        const { password: hashedPassword, ...rest } = validAdmin._doc;
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json({...rest, success: true});
    } catch (error) {
        next(error)
    }
}

export const adminSignout = async (req, res) => {
    res.clearCookie('access_token').status(200).json('Sign Out success')
};