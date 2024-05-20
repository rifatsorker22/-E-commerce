const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comments:{
        type: String,
        required: true
    },
    feedbackDate:{
        type: Date,
        default: Date.now
    }
})

const Feedback = new mongoose.model('feedback',feedbackSchema)

module.exports = Feedback ;