const Refund = require('../model/refund.model')


const health = async(req,res,next)=>{
    try {
        res.status(200).json({message:'Refund api is healthy'})
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}
const getAllRefund = async(req,res,next)=>{
    try {
        const refund = await Refund.find()

        if(refund === 0){
            res.status(200).json({message:'Refund'})
        }else{
            res.status(200).json({refund:refund})
        }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
const getRefundByStatus = async(req,res,next)=>{
    try {
        const {status}=req.params;
        const refund = await Refund.findOne({status})

        if(!status){
            res.status(404).json({message:'status is missing'})
        }else{
            res.status(200).json({refund:refund})
        }

    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
const postRefund = async(req,res,next)=>{
    try {
        const {transection_id,amount,status,reason} = req.body;
        const refund = new Refund({
            transection_id,
            amount,
            status,
            reason
        })
        await refund.save()
        res.status(201).json({refund:refund})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
const updateRefund = async(req,res,next)=>{
    try {
       const id = req.params.id
       const {amount,status,reason}=req.body 

       const updateRefund = await Refund.findByIdAndUpdate(
        id,
        {
            amount,
            status,
            reason
        },{new:true}
       )
       if(!updateRefund){
        res.status(404).json({message:'Refund Update successfully'})
       }else{
        res.status(200).json({message:'updated refund successfully',updateRefund })
       }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}


module.exports ={
    health,
    getAllRefund,
    getRefundByStatus,
    postRefund,
    updateRefund

}