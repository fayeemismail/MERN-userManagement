// In your adminController.js
import User from "../models/userModel.js";

export const admintest = async (req, res) => {
  try {
    const users = await User.find();  // Adjust as per your database model
    await res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users from the database' });
  }
};
