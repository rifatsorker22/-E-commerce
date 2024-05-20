const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['user','admin'],
        default: 'user'
    },
    status:{
        type: String,
        enum:['pending','approved','declined','blocked'],
        default: 'pending'
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const User = new mongoose.model('user',userSchema)

module.exports = User;