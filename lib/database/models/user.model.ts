import { Schema, model, models } from "mongoose"


const UserSchema = new Schema({
    clerkId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    userName: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    photo: {type: String, required: true},
})

//Using the above schema to create a model named 'User'
const User = models.User || model('User', UserSchema);//models.User is the existing model or creates a new one by using schema if it doesn't exist

export default User;