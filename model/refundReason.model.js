const mongoose = require('mongoose')

const refundReason = new mongoose.Schema({
    reason:{
        type:String,
        required: true
    },
    description:{
        type: String,
        default:''
    },
    category:{
        type: String,
        default:''  
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})
const Reason = new mongoose.model("refundReason",refundReason)

module.exports = Reason