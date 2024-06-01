const Feedback = require('../model/feedback.model')




const getByIdFeedback = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const feedback = await Feedback.findById(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!feedback){
            res.status(404).json({message:'feedback not found'})
        }else{
            res.status(200).json({
                message:'Feedback Found',
                feedback:feedback,
                links:{
                    self: `${baseUrl}/feedback/v1/${feedback.id}`,
                    allFeedback: `${baseUrl}/feedback/v1`,
                    createFeedback: `${baseUrl}/feedback/v1`,
                    update: `${baseUrl}/feedback/v1/${feedback.id}`,
                    delete: `${baseUrl}/feedback/v1/${feedback.id}`

                }})
        }
    } catch (error) {
        next(error)
    }
}
const getFeedback = async(req,res,next)=>{
    try {
        const page = +req.params.page ||1
        const limit = +req.params.limit || 5
        const skip = (page-1)*limit
        const feedback = await Feedback.find().skip(skip).limit(limit)
        const totalItem = await Feedback.count()
        const totalPage = Math.ceil(totalItem/limit)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        const pagination = {
            curretPage :page,
            totalItem: totalItem,
            totalPage : totalPage,
            hasPrev: (page > 1) ? page-1: null,
            hasNext: (page < totalPage) ? page+1: null
        }
        const links={
            self: `${baseUrl}/feedback/v1?page=${page}&limit=${limit}`,
            prev: (page > 1) ? `${baseUrl}/feedback/v1?page=${page-1}&limit=${limit}`: null,
            next: (page < totalPage) ?`${baseUrl}/feedback/v1?page=${page+1}&limit=${limit}`: null
        }


        if(!feedback){
            res.status(404).json({message:'feedback not found'})
        }else{
            res.status(200).json({
                message: 'All Feedback',
                feedback:feedback,
                pagination: pagination,
                links: links
            })
        }
    } catch (error) {
        next(error)
    }
}
const postFeedback = async(req,res,next)=>{
    try {
        const {orderId,rating,comments}=req.body
        const baseUrl = `${req.protocol}://${req.get('host')}`
        const feedback = new Feedback({
            orderId,
            rating,
            comments
        })
        await feedback.save()
        res.status(201).json({
            message:'',
            feedback:feedback,
            links:{
                self: `${baseUrl}/feedback/v1/${feedback.id}`,
                allFeedback: `${baseUrl}/feedback/v1`,
                update: `${baseUrl}/feedback/v1/${feedback.id}`,
                delete: `${baseUrl}/feedback/v1/${feedback.id}`
            }
        })

    
    } catch (error) {
        next(error)
    }
}
const putFeedback = async(req,res,next)=>{
    try {
        const {id}=req.params
        const {orderId,rating,comments}=req.body
        const baseUrl = `${req.protocol}://${req.get('host')}`
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
            res.status(203).json({
                message:'Feedback updated Successfully',
                UpdateFeedback: UpdateFeedback,
                links:{
                    self: `${baseUrl}/feedback/v1/${UpdateFeedback.id}`,
                    delete: `${baseUrl}/feedback/v1/${UpdateFeedback.id}`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const deleteFeedback = async(req,res,next)=>{
    try {
        const {id} = req.params
        const deleteFeedback = await Feedback.getByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!deleteFeedback){
            res.status(404).json({message:'feedback not found'})
        }else{
            res.status(203).json({
                message:'Feedback deleted Successfully',
                deleteFeedbackFeedback: deleteFeedback,
                links:{
                    allFeedback: `${baseUrl}/feedback/v1`,
                    createFeedback: `${baseUrl}/feedback/v1`,
                }
            })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {
  
    getByIdFeedback,
    getFeedback,
    postFeedback,
    putFeedback,
    deleteFeedback
}