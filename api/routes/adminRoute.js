import express from "express";
import { admintest, deleteUser, editUser, updateUser, userBlock } from "../controllers/adminController.js";
import { verifyAdminToken } from "../utils/verifyUser.js";

const adminRouter = express.Router()

adminRouter.get('/', admintest);
adminRouter.post('/userBlock', userBlock );
adminRouter.get('/EditUser/:userid', editUser);
adminRouter.put('/updateUser/:userid', updateUser);
adminRouter.delete('/userDelete/:userid', deleteUser)



export default adminRouter