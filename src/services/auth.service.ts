import userModel from '../models/user.model'

const createUser = async (body: RequestBody) => {
    const { email, password } = body
    // const user = await userModel.findOne({ email })

    // if(user)

    const result = await userModel.create(body)

    return result
}

export { createUser }
