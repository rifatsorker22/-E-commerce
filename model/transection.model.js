const mongoose = require('mongoose')

const transectionSchema = new mongoose.Schema({
    customar_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    payment_source_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Payment',
        required: true
    },
    amount:{
        type: Number,
        required: true,
    },
    currency:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:['pending','success','failed'],
        default:'pending'
    },
    description:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Transection = new mongoose.model("transection",transectionSchema)

module.exports = Transection;