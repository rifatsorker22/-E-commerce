const Tracking = require('../model/tracking.model')

const getById = async(req,res,next) =>{
    try {
        const {id} = req.params
        const tracking = await Tracking.findById(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(!tracking){
            res.status(404).json({message:'Tracking not found'})
        }else{
            res.status(200).json({
                messgae:'Tracking found',
                Tracking: tracking,
                links:{
                    self: `${baseUrl}/tracking/v1/${tracking.id}`,
                    AllTracking: `${baseUrl}/tracking/v1`,
                    create:`${baseUrl}/tracking/v1`,
                    update:`${baseUrl}/tracking/v1/${tracking.id}`,
                    delete:`${baseUrl}/tracking/v1/${tracking.id}`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const getAll = async(req,res,next) =>{
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit ||10
        const skip = (page -1)* limit
        const tracking = await Tracking.find()
        .skip(skip)
        .limit(limit)
        const totalItem = await Tracking.count()
        const totalPage = Math.ceil(totalItem/limit)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(200).json({
            message:'All Recommendations',
            Tracking: tracking,
            pagination:{
                currentPage:page,
                totalItem:totalItem,
                totalPage: totalPage,
                hasPrev: (page > 1) ? page-1 : null,
                hasNext: (page < totalPage) ? page + 1: null
            },
            links:{
                self: `${baseUrl}/tracking/v1?page=${page}&limit=${limit}`,
                prev: (page > 1) ? `${baseUrl}/tracking/v1?page=${page-1}&limit=${limit}`: null,
                next: (page < totalPage) ? `${baseUrl}/tracking/v1?page=${page+1}&limit=${limit}`: null

            }
        })
    } catch (error) {
        next(error)
    }
}
const create = async(req,res,next) =>{
    try {
        const {trackingNumber,carrier,status} = req.body

        if(!trackingNumber||!carrier||!status){
            res.status(404).json({
                message:'Invaild Credientials',
            })
        }else{
            const newTracking = new Tracking({
                trackingNumber,
                carrier,
                status
            })
            await newTracking.save()
            const baseUrl = `${req.protocol}://${req.get('host')}`
            res.status(201).json({
                message: 'New tracking is created',
                Tracking : newTracking,
                links:{
                self: `${baseUrl}/tracking/v1/${newTracking.id}`,
                AllTracking: `${baseUrl}/tracking/v1`
                } 
            })
        }
    } catch (error) {
        next(error)
    }
}
const updateById = async(req,res,next) =>{
    try {
        const {id} = req.params
        const {trackingNumber,carrier,status} = req.body

        if(!trackingNumber||!carrier||!status){
            res.status(404).json({
                message:'Invaild Credientials',
            })
        }else{
            const updateTracking = await Tracking.findByIdAndUpdate(
                id,
                {
                     $set:{
                        trackingNumber:trackingNumber,
                        carrier:carrier,
                        status:status
                     }
                },{new:true}
            )
            const baseUrl = `${req.protocol}://${req.get('host')}`

            res.status(200).json({
                message:'Updated Successfully',
                UpdatedTracking : updateTracking,
                links:{
                   self: `${baseUrl}/tracking/v1/${updateTracking.id}`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const DeleteById = async(req,res,next) =>{
    try {
        const {id} = req.params
        const tracking = await Tracking.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(!tracking){
            res.status(404).json({message:'Tracking not found'})
        }else{
            res.status(200).json({
                messgae:'Tracking Deleted Successfully',
                Tracking: tracking,
                links:{
                    AllTracking: `${baseUrl}/tracking/v1`,
                    create:`${baseUrl}/tracking/v1`,
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
    DeleteById
}