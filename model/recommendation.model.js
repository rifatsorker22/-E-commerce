const {Schema,model, default: mongoose} = require('mongoose')

const recommendationSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true
    }

})

const Recommendation = new model('recommendation',recommendationSchema)


module.exports = Recommendation;    
