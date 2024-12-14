import express from 'express';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminRoute.js';
configDotenv();

mongoose.connect(process.env.MONGO)
.then(res => {
    console.log('connected mongodb')
})
.catch((err) => {
    console.log(err)
})




const app = express();

app.use(express.json());
app.use(cookieParser())


app.use("/api/admin", adminRouter)
app.use("/api/user", userRoutes);
app.use('/api/auth', authRoutes);



app.listen(3000, ()=> {
    console.log('http://localhost:3000/')
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});