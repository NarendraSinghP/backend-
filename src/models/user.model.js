import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,

    },
    fullName : {
        type: String,
        required: true,
        trim: true,
        index : true
    },
    avatar :{
        type: String, // cloudinary url
        required: true
    },
    coverImage :{
        type: String, // cloudinary url
    },
    watchHistory :[ {
        type : Schema.Types.ObjectId,
        ref : "Video"
    }],
     
    password : {
        type : String, 
        required : [true ,  "Password is required"]
    },

    refreshToken : {
        type : String 
    }
    
}, {
    timestamps : true ,
})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next() 
    this.password = await bcrypt.hash(this.password , 10)
}) // because there is not context of the user details it have so we need to write function in this format and a next cause it is a middleware

// Mongoose gives the middleware function a this context that refers to the document being saved. here this will refer to the userSchema 

userSchema.methods.isPasswordCorrect = async function (password){
    return  await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){

}
export const User = mongoose.model('User', userSchema);