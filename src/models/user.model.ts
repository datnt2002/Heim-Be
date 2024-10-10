import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, lowercase: true, trim: true, required: true },
        number: { type: Number, required: true },
        avatarUrl: String,
        password: String,
    },
    { timestamps: true }
)

const userModel = mongoose.model('User', userSchema)

export default userModel
