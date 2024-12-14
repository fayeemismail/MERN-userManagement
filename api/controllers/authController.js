import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({ username , email , password: hashedPassword})
        await newUser.save()
        res.status(201).json({ message: "User registered successfully", user: { username, email } });
    } catch (error) {
        next(error)
    }
}


export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, 'User Not Found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Invalid Credentials'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); 
        res.cookie( 'access_token', token , { httpOnly: true, expires: expiryDate} )
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }
}



export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            const token = jwt.sign({ id: user._id} , process.env.JWT_SECRET);
            const {password : hashedPassword, ...rest} = user._doc
            const expiryDate = new Date(Date.now() + 3600000);

            res.cookie('access_token', token, { httpOnly: true , expires: expiryDate}).status(200).json(rest)
        } else {
            const genaratedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(genaratedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id } , process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.new() + 3600000);

            res.cookie('access_token' , token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest)
        }
    } catch (error) {

    }
}

export const signout = async (req, res) => {
    res.clearCookie('access_token').status(200).json('Sign Out success')
}