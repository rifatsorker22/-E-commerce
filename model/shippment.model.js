const {Schema,model} = require('mongoose')


const ShippingSchema = new Schema({

})
const Shipping = new model('shipping',ShippingSchema)

module.exports = Shipping