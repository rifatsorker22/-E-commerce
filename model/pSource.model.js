const mongoose = require('mongoose')

const paymentSource = new mongoose.Schema({
    customar_id:{
        type: String,
        ref:'User',
        required: true
    },
    type:{
        type:String,
        enum:['credit_card','bank_account'],
        required:true
    },
    last_four_digits:{
        type: String,
        required:true
    },
    expiration_date:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


})
const Payment = new mongoose.model("paymentSource",paymentSource)


module.exports = Payment;