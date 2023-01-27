import mongoose from "mongoose";
import AuthRoles from '../utils/authRoles'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Name is required"],
            maxLength: [50, "Name must be less than 50"]
        },
        email: {
            type: String,
            require: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            require: [true, "Password is required"],
            minLength: [6, "Password must be more than 6 characters"],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema)