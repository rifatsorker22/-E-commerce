const ShippingLabel = require('../model/shippingLabel.model')

const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const shippingLabel = await ShippingLabel.findById(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(!shippingLabel){
            res.status(404).json({
                message:'Shipping Label not found'
            })
        }else{
            res.status(200).json({
                message:'Shippign Label found',
                shippingLabel: shippingLabel,
                links:{
                    self: `${baseUrl}/shippingLabel/v1/${shippingLabel.id}`,
                    allShippingLabel: `${baseUrl}/shippingLabel/v1`,
                    create: `${baseUrl}/shippingLabel/v1`,
                    update: `${baseUrl}/shippingLabel/v1/${shippingLabel.id}`,
                    delete: `${baseUrl}/shippingLabel/v1/${shippingLabel.id}`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const getAll = async(req,res,next)=>{
    try {
        const shippingLabel = await ShippingLabel.find().populate('package')
        const baseUrl = `${req.protocol}://${req.get('host')}`
    } catch (error) {
        next(error)
    }
}
const create = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const updateById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const {} = req.body
        const shippingLabel = await ShippingLabel.findByIdAndUpdate(
            id,{
                $set:{

                }

               })
        const baseUrl = `${req.protocol}://${req.get('host')}`
    } catch (error) {
        next(error)
    }
}
const deleteById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const shippingLabel = await ShippingLabel.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(!shippingLabel){
            res.status(404).json({
                message:'Shipping Label not found'
            })
        }else{
            res.status(200).json({
                message:'Shippign Label deleted successfully',
                shippingLabel: shippingLabel,
                links:{                   
                    allShippingLabel: `${baseUrl}/shippingLabel/v1`,
                    create: `${baseUrl}/shippingLabel/v1`,
                }
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getById,
    getAll,
    create,
    updateById,
    deleteById
}