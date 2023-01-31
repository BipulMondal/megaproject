import mongoose from "mongoose"
import AuthRoles from '../utils/authRoles'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import crypto from 'crypto'
import config from "../config/index"



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

//challenge 1- encrypt the password - hooks
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//add more featuers/methods directly to your schema
userSchema.methods = {
    //compare password
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    },
    
    //generate jwt token
    getJwtToken: function(){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },

    generateForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(20).toString('hex');

        //step 1 - save to DB
        this.forgotPasswordToken = crypto 
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

        //step 2 - return value to user
        return forgotToken

    }
}



export default mongoose.model("User", userSchema)