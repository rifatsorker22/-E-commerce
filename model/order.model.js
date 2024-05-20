const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    cartItems:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required: true
        },
        quantity:{
            type: Number,
            required: true,
            min: 1
        },
        price:{
            type: Number,
            required: true,
            min: 0
        }
    }],
    totalPrice:{
        type: Number,
        required: true,
        min : 0
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
      }
    ,
    status:{
        type: String,
        enum:['Pending','Proccessing','Shipped','Delivered'],
        default:'Pending'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Order = new mongoose.model("order",OrderSchema)

module.exports = Order ;