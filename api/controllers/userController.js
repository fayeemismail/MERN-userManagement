import cloudinaryConfig from '../config/cloudinaryConfig.js';
import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const uploadPhoto = async(req, res) => {
    try {
        const result = await cloudinaryConfig.uploader.upload(req.file.path , {
            folder: "user_photos"
        });

        const user = await User.findByIdAndUpdate(
            req.user.id, // Assuming `req.user.id` is set by middleware
            { profilePicture: result.secure_url },
            { new: true }
          );

          res.status(200).json({ message: "Photo uploaded successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Cloudinary upload failed", details: error.message });
    }
}

export const test = async (req, res)=>{
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({success: false});
    if(user.isBlocked) return res.status(404).json({success: false});
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}






export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account'));
    }
  
    try {
      const { username, email, password, profilePicture } = req.body;
  
      let hashedPassword = password;
      if (password) {
        hashedPassword = bcryptjs.hashSync(password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username,
            email,
            password: hashedPassword,
            profilePicture,
          },
        },
        { new: true }
      );
  
      const { password: _, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  


export const deleteUser = async (req, res, next)=>{
    if(req.params.id !== req.user.id){
        return next(errorHandler(401, 'You cannot delete your account'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (error) {
        next(error)
    }
}