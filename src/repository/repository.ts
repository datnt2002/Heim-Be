import userModel from '../models/user.model'

export const findByUsernameOrEmail = (username: string, email: string) => {
    return userModel
        .findOne({
            $or: [{ email: email }, { username: username }],
        })
        .lean()
        .exec()
}
