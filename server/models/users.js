import mongoose, { mongo } from "mongoose"

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    
    last_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const User = mongoose.model("user", UserSchema)

export default User