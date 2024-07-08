const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the 'User' model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Refers to the 'Product' model
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3 // Default rating
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String,
        trim: true
    }
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
