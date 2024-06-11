const ShippingLabel = require('../model/shippingLabel.model')
const Address = require('../model/address.model')
const Package = require('../model/package.model')
const Tracking = require('../model/tracking.model')

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
        const page = +req.query.page || 1;
        const limit = +req.query.limit ||10
        const skip = (page -1)* limit
        const shippingLabel = await ShippingLabel.find().populate('package')
        .skip(skip)
        .limit(limit)
        const totalItem = await Tracking.count()
        const totalPage = Math.ceil(totalItem/limit)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(200).json({
            message:'All Shipping Labels',
            ShippingLabel: shippingLabel,
            pagination:{
                currentPage:page,
                totalItem:totalItem,
                totalPage: totalPage,
                hasPrev: (page > 1) ? page-1 : null,
                hasNext: (page < totalPage) ? page + 1: null
            },
            links:{
                self: `${baseUrl}/shippinglabel/v1?page=${page}&limit=${limit}`,
                prev: (page > 1) ? `${baseUrl}/shippinglabel/v1?page=${page-1}&limit=${limit}`: null,
                next: (page < totalPage) ? `${baseUrl}/shippinglabel/v1?page=${page+1}&limit=${limit}`: null

            }
        })
    } catch (error) {
        next(error)
    }
}
const create = async(req,res,next)=>{
    try {
      const {
        senderName,
        senderAddressId,
        recipientName,
        recipientAddressId,
        packageId,
        trackingInfoId,
          } = req.body
    if(!senderAddressId||!senderName||!recipientName||!recipientAddressId||!packageId||!trackingInfoId){
        res.status(404).json({
            message:'invalid credintials'
        })
    }else{
        const senderId = await Address.findById(senderAddressId)
        const recipientId = await Address.findById(recipientAddressId)
        const package = await Package.findById(packageId)
        const tracking = await Tracking.findById(trackingInfoId)
     
        if(!senderId || !recipientId ||!package ||!tracking){
            res.status(404).json({
                 message:'credientials not found'
            })
        }else{
            const shippingLabel = new ShippingLabel({
                senderName,
                senderAddressId,
                recipientName,
                recipientAddressId,
                packageId,
                trackingInfoId,
            })
            await shippingLabel.save()
            const baseUrl = `${req.protocol}://${req.get('host')}`
            res.status(201).json({
                message:'New shipping label created',
                shippingLabel:shippingLabel,
                links:{
                    self: `${baseUrl}/shippingLabel/v1/${shippingLabel.id}`,
                    allShippingLabel: `${baseUrl}/shippingLabel/v1`
                }

            })
        }
    }

    } catch (error) {
        next(error)
    }
}
const updateById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const {
            senderName,
            senderAddressId,
            recipientName,
            recipientAddressId,
            packageId,
            trackingInfoId,
              } = req.body
        const shippingLabel = await ShippingLabel.findByIdAndUpdate(
            id,{
                $set:{
                    senderName: senderName,
                    senderAddressId: senderAddressId,
                    recipientName:recipientName,
                    recipientAddressId:recipientAddressId,
                    packageId:packageId,
                    trackingInfoId: trackingInfoId
                }

               },{new:true})
        const baseUrl = `${req.protocol}://${req.get('host')}`

        res.status(200).json({
            message:'Shipping Label updated successfully',
            UpdatedShippingLael: shippingLabel,
            links:{
                self:`${baseUrl}/shippingLabel/v1/${shippingLabel.id}`
            }
        })
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