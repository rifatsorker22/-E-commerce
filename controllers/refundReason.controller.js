const Reason = require('../model/refundReason.model')


const health = async(req,res,next)=>{
    try {
        res.status(200).json({message:'Refund reason api is healthy'})
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}
const getById = async(req,res,next)=>{
    try {
        const {id}=req.body
        const reason = await Reason.findById(id)
        if(!reason){
            res.status(404).json({message:'Reason not found'})
        }else{
            res.status(203).json({reason:reason})
        }
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}
const getAllrefundReason = async(req,res,next)=>{
    try {
        const reason = await Reason.find()

        if(reason === 0){
            res.status(404).json({message:'Reason not found'})
        }else{
            res.status(200).json({reason:reason})
        }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
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
        res.status(201).json({reason:newReason})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
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
        res.status(203).json({message:'update reason successfully',updateReason})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
const deleteRefundReason = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const deleteRefundReason = await Reason.findByIdAndDelete(id)

        if(!deleteRefundReason){
            res.status(404).json({message:'Reason not found'})
        }else{
            res.status(203).json({message:'Refund Reason Deleted successfully'})
        }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

module.exports ={
  health,
  getById,
  getAllrefundReason,
  postRefundReason,
  putRefundReason,
  deleteRefundReason
}