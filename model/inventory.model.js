const {Schema,model}=require('mongoose')

const inventorySchema =new Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Inventory = new model('inventory',inventorySchema)

module.exports = Inventory