import express from "express";
import { admintest } from "../controllers/adminController.js";
import { verifyAdminToken } from "../utils/verifyUser.js";

const adminRouter = express.Router()

adminRouter.get('/', admintest);
adminRouter.get('/signin')



export default adminRouter