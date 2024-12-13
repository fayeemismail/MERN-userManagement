import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1LDOkjkGghywy34d7J_4gpnpXXv9xE_kDZm10nz9-k1K5xD-26oLj_6I&s"
    }
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema);


export default User;