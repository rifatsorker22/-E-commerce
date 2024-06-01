const Recommendation = require('../model/recommendation.model')


const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const recommendation = await Recommendation.findById(id)
        .populate('user')
        .populate('product')  
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!recommendation){
            res.status(404).json({
                message:'Recommendation not found'
            })
        }else{
            res.status(200).json({
                message:'recommendation found',
                Recommendation: recommendation,
                links:{
                    self: `${baseUrl}/recommendation/v1/${recommendation.id}`,
                    allRecomendation: `${baseUrl}/recommendation/v1`,
                    createRecomendation: `${baseUrl}/recommendation/v1`,
                    update: `${baseUrl}/recommendation/v1/${recommendation.id}`,
                    delete: `${baseUrl}/recommendation/v1/${recommendation.id}`
                }
            })
        }
     } catch(e) {
        next(e)
    }
}
const getAll = async(req,res,next)=>{
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit ||10
        const skip = (page -1)* limit
        const recomendation = await Recommendation.find()
        .populate('user')
        .populate('product')
        .skip(skip)
        .limit(limit)
        const totalItem = await Recommendation.count()
        const totalPage = Math.ceil(totalItem/limit)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(200).json({
            message:'All Recommendations',
            Recommendation: recomendation,
            pagination:{
                currentPage:page,
                totalItem:totalItem,
                totalPage: totalPage,
                hasPrev: (page > 1) ? page-1 : null,
                hasNext: (page < totalPage) ? page + 1: null
            },
            links:{
                self: `${baseUrl}/recommendation/v1?page=${page}&limit=${limit}`,
                prev: (page > 1) ? `${baseUrl}/recommendation/v1?page=${page-1}&limit=${limit}`: null,
                next: (page < totalPage) ? `${baseUrl}/recommendation/v1?page=${page+1}&limit=${limit}`: null

            }
        })
    } catch(e) {
        next(e)
    }
}
const create = async(req,res,next)=>{
    try {
        const {userId,productId} = req.body

        if(!userId || !productId){
            res.status(404).json({
                messgae:'Invalid credintials'
            })
        }else{
            const newRecommendation = new Recommendation({
                userId,
                productId
            })
            await newRecommendation.save()
            const baseUrl = `${req.protocol}://${req.get('host')}`
            res.status(201).json({
                message:'New recommendatiion created',
                Recommendation: newRecommendation,
                links:{
                    self: `${baseUrl}/recommendation/v1/${newRecommendation.id}`,
                    allRecomendation: `${baseUrl}/recommendation/v1`,
                    update: `${baseUrl}/recommendation/v1/${newRecommendation.id}`,
                    delete: `${baseUrl}/recommendation/v1/${newRecommendation.id}`
                }
            })
        }
    } catch(e) {
        next(e)
    }
}
const updateById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const {userId,productId} = req.body
        if(!userId || !productId){
            res.status(404).json({
                messgae:'Invalid credintials'
            })
        }else{
            const updateRecommendation = await Recommendation.findByIdAndUpdate(
                id,
                {
                    $set:{
                        userId:userId,
                        productId:productId
                    }
                },{new:true}
            )
            const baseUrl = `${req.protocol}://${req.get('host')}`
            res.status(200).json({
                message:'Recommendation updateed Successfully',
                update: updateRecommendation,
                links:{
                    self: `${baseUrl}/recommendation/v1/${updateRecommendation.id}`,
                    delete:`${baseUrl}/recommendation/v1/${updateRecommendation.id}`
                }
            
            })
           
       
    }
    }catch(e) {
        next(e)
    }
}
const deleteById = async(req,res,next)=>{
    try {
        const {id} = req.params

        const deleteRecommendation = await Recommendation.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!deleteRecommendation){
            res.status(404).json({
                message:'Recommendation not found',
            })
        }else{
            res.status(200).json({
                message:'Recommendation Deleted successfully',
                delete:deleteRecommendation,
                links:{
                    allRecomendation: `${baseUrl}/recommendation/v1`,
                    createRecomendation: `${baseUrl}/recommendation/v1`,
                }
            })
        }
    } catch(e) {
        next(e)
    }
}



module.exports = {
    getById,
    getAll,
    create,
    updateById,
    deleteById
}