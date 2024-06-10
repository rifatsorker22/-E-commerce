const {Schema,model} = require('mongoose');

const trackingSchema = new Schema({
    trackingNUmber:{
        type: Number,
        required: true,
        unique: true
    },
    carrier:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

const Tracking = new model('tracking',trackingSchema)

module.exports = Tracking