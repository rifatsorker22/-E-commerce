const {Schema,model} = require('mongoose')

const userSchema = Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    profilePicture: String,
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
}) 

const User = model('user',userSchema)

module.exports = User;