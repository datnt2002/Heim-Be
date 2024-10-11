import mongoose, { Schema } from 'mongoose'
import { hash } from 'bcrypt'
import { IUser } from '../types/user.type'

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, lowercase: true, trim: true, required: true },
        number: { type: Number, required: true },
        avatarUrl: String,
        password: { type: String, required: true },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, 8)
    }
    next()
})

const userModel = mongoose.model('User', userSchema)

export default userModel
