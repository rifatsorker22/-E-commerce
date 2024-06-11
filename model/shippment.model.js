const { Schema, model, default: mongoose } = require('mongoose');
const ShippingLabel = require('./shippingLabel.model'); // Import the ShippingLabel model

const shippingSchema = new Schema({
    shippingLabel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingLabel',
        required: true
    },
    shippingDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'in transit', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

const Shipping = model('Shipping', shippingSchema);

module.exports = Shipping;
