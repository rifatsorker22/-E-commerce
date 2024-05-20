const Feedback = require('../model/feedback.model')



const health = async(req,res,next)=>{
    try {
        res.status(200).json({message:'Feedback api is healthy'})
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
} 
const getByIdFeedback = async(req,res,next)=>{
    try {
        const {id}=req.params
        const feedback = await Feedback.findById(id)
        if(!feedback){
            res.status(404).json({message:'feedback not found'})
        }else{
            res.status(200).json({feedback:feedback})
        }
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}
const getFeedback = async(req,res,next)=>{
    try {
        const feedback = await Feedback.find()
        if(!feedback){
            res.status(404).json({message:'feedback not found'})
        }else{
            res.status(200).json({feedback:feedback})
        }
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}
const postFeedback = async(req,res,next)=>{
    try {
        const {orderId,rating,comments}=req.body

        const feedback = new Feedback({
            orderId,
            rating,
            comments
        })
        await feedback.save()
        res.status(201).json({feedback:feedback})

    
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}
const putFeedback = async(req,res,next)=>{
    try {
        const {id}=req.params
        const {orderId,rating,comments}=req.body

        const UpdateFeedback = await Feedback.getByIdAndUpdate(
            
            id,
            {
                orderId:orderId,
                rating: rating,
                comments:comments
            },
            {new:true}
            )
        if(!UpdateFeedback){
            res.status(404).json({message:'feedback not found'})
        }else{
            res.status(203).json({message:'Feedback updated Successfully',UpdateFeedback})
        }
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}
const deleteFeedback = async(req,res,next)=>{
    try {
        const {id}=req.params
        const deleteFeedback = await Feedback.getByIdAndDelete(id)
        if(!deleteFeedback){
            res.status(404).json({message:'feedback not found'})
        }else{
            res.status(203).json({message:'Feedback deleted Successfully',deleteFeedbackFeedback})
        }
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
}


module.exports = {
    health,
    getByIdFeedback,
    getFeedback,
    postFeedback,
    putFeedback,
    deleteFeedback
}