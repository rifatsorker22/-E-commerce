const {Schema,model, default: mongoose} = require('mongoose');
const Address = require('./address.model');
const Package = require('./package.model');
const Tracking = require('./tracking.model');

const shippingLabelSchema = new Schema({
 sender:{
    name:{
        type: String,
        required: true
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Address,
        required: true
    }
 },
 recipient:{
    name:{
        type: String,
        required: true
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Address,
        required: true
    }
 },
 package:{
   type: mongoose.Schema.Types.ObjectId,
   ref: Package,
   required: true
 },
 trackingInfo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: Tracking,
    required: true
 }
 
},{timestamps: true})

const ShippingLabel = new model('shippingLabel',shippingLabelSchema)

module.exports = ShippingLabel;