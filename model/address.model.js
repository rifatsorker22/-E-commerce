const {Schema,model} = require('mongoose')

const addressSchema = new Schema({
    street:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true 
    },
    state:{
        type:String,
        required: true
    },
    postalCode:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required: true
    }


},{
    timestamps:true
}
)

const Address = new model('address',addressSchema)

module.exports = Address