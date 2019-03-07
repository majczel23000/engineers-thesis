import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    firstName: {
        type:String, 
        required: true
    },
    lastName: {
        type:String, 
        required: true
    },
    email: {
        type:String, 
        required: true
    },
    password: {
        type:String, 
        required: true
    },
    phoneNumber: {
        type:String, 
        required: true
    },
    roles: [String]
})

export default mongoose.model('User', UserSchema);