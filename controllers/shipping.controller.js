const ShippingLabel = require('../model/shippingLabel.model')
const Shipping = require('../model/shippment.model')

const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const shipping = await Shipping.findById(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(!shipping){
            res.status(404).json({
                message:'Shipping not found'
            })
        }else{
            res.status(200).json({
                message: 'Shipping found',
                shipping: shipping,
                links:{
                   self: `${baseUrl}/shipping/v1/${shipping.id}`,
                   AllShipping: `${baseUrl}/shipping/v1`,
                   create: `${baseUrl}/shipping/v1`,
                   update: `${baseUrl}/shipping/v1/${shipping.id}`,
                   delete: `${baseUrl}/shipping/v1/${shipping.id}`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const getAll = async(req,res,next)=>{
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit ||10
        const skip = (page -1)* limit
        const shipping = await Shipping.find().populate('shippingLabel')
        .skip(skip)
        .limit(limit)
        const totalItem = await Tracking.count()
        const totalPage = Math.ceil(totalItem/limit)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(200).json({
            message:'All Shipping Labels',
            Shippingl: shipping,
            pagination:{
                currentPage:page,
                totalItem:totalItem,
                totalPage: totalPage,
                hasPrev: (page > 1) ? page-1 : null,
                hasNext: (page < totalPage) ? page + 1: null
            },
            links:{
                self: `${baseUrl}/shipping/v1?page=${page}&limit=${limit}`,
                prev: (page > 1) ? `${baseUrl}/shipping/v1?page=${page-1}&limit=${limit}`: null,
                next: (page < totalPage) ? `${baseUrl}/shipping/v1?page=${page+1}&limit=${limit}`: null

            }
        })
    } catch (error) {
        next(error)
    }
}
const create = async(req,res,next)=>{
    try {
        const { shippingLabel, shippingDate, deliveryDate, status } = req.body;

        if(!shippingLabel||!shippingDate||!deliveryDate||!status){
           res.status(404).json({
            message:'Invalid credientials'
           })
        }else{
            const shipping = new Shipping({
                shippingLabel,
                shippingDate,
                deliveryDate,
                status
            })
            await shipping.save()
            const baseUrl = `${req.protocol}://${req.get('host')}`
            res.status(201).json({
                message:'Shipping is created',
                shipping: shipping,
                links:{
                    self:`${baseUrl}/shipping/v1/${shipping.id}`,
                    AllShipping: `${baseUrl}/shipping/v1`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const updateById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const { shippingLabel, shippingDate, deliveryDate, status } = req.body;

        if(!shippingLabel||!shippingDate||!deliveryDate||!status){
           res.status(404).json({
            message:'Invalid credientials'
           })
        }else{
            const updatedShipping = await Shipping.findByIdAndUpdate(
                id,{
                    $set:{
                        shippingLabel:shippingLabel,
                        shippingDate:shippingDate,
                        deliveryDate:deliveryDate,
                        status:status
                    }
                },{new:true}
            )
            const baseUrl = `${req.protocol}://${req.get('host')}`
            res.status(200).json({
                message:'Successfully updated',
                UpdatedShipping: updatedShipping,
                links:{
                    self: `${baseUrl}/shipping/v1/${updatedShipping.id}`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}

const deleteById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const shipping = await Shipping.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        
        if(!shipping){
            res.status(404).json({
                message:'Shipping not found'
            })
        }else{
            res.status(200).json({
                message: 'Shipping is deleted',
                DeletedShipping: shipping,
                links:{
                   AllShipping: `${baseUrl}/shipping/v1`,
                   create: `${baseUrl}/shipping/v1`,
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