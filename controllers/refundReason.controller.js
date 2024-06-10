const Reason = require('../model/refundReason.model')



const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const reason = await Reason.findById(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!reason){
            res.status(404).json({message:'Reason not found'})
        }else{
            res.status(203).json({
                message:'Reason',
                reason:reason,
                links:{
                    self: `${baseUrl}/refund/reason/v1/${reason.id}`,
                    allRefundReason: `${baseUrl}/refund/reason/v1`,
                    createRefundReason: `${baseUrl}/refund/reason/v1`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const getAllrefundReason = async(req,res,next)=>{
    try {
        const page  = +req.query.page || 1
        const limit = +req.query.limit ||10
        const skip = (page - 1) * limit
        const reason = await Reason.find().skip(skip).limit(limit)
        const totalItem = await Reason.count()
        const totalPage = Math.ceil(totalItem/limit)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(reason === 0){
            res.status(404).json({message:'Reason not found'})
        }else{
            res.status(200).json({
                message:'All refund reason',
                reason:reason,
                pagination:{
                  currentPage: page,
                  totalItem:totalItem,
                  totalPage: totalPage,
                  prev:(page > 1) ? page -1 : null,
                  next: (page < totalPage) ? page + 1 : null
                },
                links:{
                    self: `${baseUrl}/refund/reason/v1?page=${page}&limit=${limit}`,
                    prev:(page > 1) ? `${baseUrl}/refund/reason/v1?page=${page -1}&limit=${limit}`:null, 
                    next:(page < totalPage) ?`${baseUrl}/refund/reason/v1?page=${page +1}&limit=${limit}`:null

                }
        
        })
        }
    } catch (error) {
        next(error)
    }
}
const postRefundReason = async(req,res,next)=>{
    try {
        const {reason,description,category}=req.body

        const newReason = new Reason({

            reason,
            description,
            category

        })

        await newReason.save()
        const baseUrl = `${req.protocol}://${req.get('host')}`
        
        res.status(201).json({
            message: 'New Refund reason created',
            reason:newReason,
            links:{
              self: `${baseUrl}/refund/reason/v1/${newReason.id}`,
              allRefundReason: `${baseUrl}/refund/reason/v1`,
              update: `${baseUrl}/refund/reason/v1/${newReason.id}`,
              delete: `${baseUrl}/refund/reason/v1/${newReason.id}`,
            }
        })
    } catch (error) {
        next(error)
    }
}
const putRefundReason = async(req,res,next)=>{
    try {
        const {id}=req.params
        const {reason,description,category}=req.body

        const updateReason = await Reason.findByIdAndUpdate(
            id,
            {
                reason:reason,
                description:description,
                category:category
            },
            {new:true}
        )
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(203).json({
            message:'update reason successfully',
            updateReason: updateReason,
            links:{
                self: `${baseUrl}/refund/reason/v1/${updateReason.id}`,
                allRefundReason: `${baseUrl}/refund/reason/v1`,
                createRefundReason: `${baseUrl}/refund/reason/v1`
            }
        })
    } catch (error) {
        next(error)
    }
}
const deleteRefundReason = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const deleteRefundReason = await Reason.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!deleteRefundReason){
            res.status(404).json({message:'Reason not found'})
        }else{
            res.status(203).json({
                message:'Refund Reason Deleted successfully',
               deleteRefundReason : deleteRefundReason,
               links:{
                  allRefundReason: `${baseUrl}/refund/reason/v1`,
                  createRefundReason: `${baseUrl}/refund/reason/v1`
               }
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports ={
  getById,
  getAllrefundReason,
  postRefundReason,
  putRefundReason,
  deleteRefundReason
}