const {Schema,model} = require('mongoose');

const packageSchema = new Schema({
    package:{
        weight:{
            type: Number,
            required: true
        },
        dimensions:{
            length:{
                type: Number,
                required: true
            },
            width:{
                type: Number,
                required: true
            },
            height:{
                type: Number,
                required: true
            }
        }
     }
})

const Package = new model('package',packageSchema)

module.exports = Package