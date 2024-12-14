import express from "express";
import { admintest } from "../controllers/adminController.js";

const adminRouter = express.Router()

adminRouter.get('/', admintest)

export default adminRouter