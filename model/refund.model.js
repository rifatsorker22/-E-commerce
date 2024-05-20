const mongoose = require('mongoose')

const refundSchema = new mongoose.Schema({
    transection_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transection',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum:['pending','success','failed'],
        required: true
    },
    reason:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Refund = new mongoose.model("refund",refundSchema)

module.exports = Refund ; 