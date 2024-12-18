import User from "../models/userModel.js";

export const admintest = async (req, res) => {
  try {
    const users = await User.find({isAdmin: false});  
    await res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users from the database' });
  }
};


export const userBlock = async (req, res) => {
  try {
    const { userid } = req.body;

    if (!userid) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userData = await User.findOne({ _id: userid });
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    userData.isBlocked = !userData.isBlocked;

    await userData.save();

    return res.status(200).json({
      message: `User has been ${userData.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user: userData,
    });
  } catch (error) {
    console.error('Error in userBlock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const editUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);    
  }
};



export const updateUser = async (req, res) =>{
  try {
    const { userid } = req.params;
    const { username, email } = req.body;

    if (!userid) return res.status(403).json({ message: 'Error Fetching Details' });
    if (!username || !email) return res.status(403).json({ message: 'Fill all required fields' });

    const userData = await User.findById(userid);
    if (!userData) return res.status(404).json({ message: 'User not found' });

    userData.username = username;
    userData.email = email;

    await userData.save();

    return res.status(200).json({
      message: 'User updated successfully',
      updatedUser: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the user' });
  }
}


export const deleteUser = async(req, res) => {
  try {
    const {userid} = req.params
    await User.findByIdAndDelete(userid);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    console.log(error);
  }
}