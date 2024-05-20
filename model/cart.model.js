const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    items:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        price:{
            type: Number,
            required: true
        }
    }],
    totalQuantity:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Cart = new mongoose.model("cart",cartSchema)

module.exports = Cart ;