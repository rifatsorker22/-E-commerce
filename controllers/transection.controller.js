const Transection = require('../model/transection.model')


const health = async(req,res,next)=>{
   try {
       res.status(200).json({message:'Transection api is healthy'})
   } catch (error) {
       res.status(500).json({messgae:'server Error'})
   }
} 
const getTransection = async(req,res,next)=>{
 try {
    const transection = await Transection.find()

    if(transection === 0){
        res.status(404).json({message:'transection not found'})
    }else{
        res.status(200).json({transection:transection})
    }
 } catch (error) {
    res.status(500).json({message:'Server Error'})
 }
}
const postTransection = async(req,res,next)=>{
    try {
       const {customar_id,payment_source_id,amount,currency,description}=req.body

       const newTransection= new Transection({
        customar_id,
        payment_source_id,
        amount,
        currency,
        description
       })
        await newTransection.save()
        res.status(201).json({Transection:newTransection})
    } catch (error) {
       
       res.status(500).json({message:'Server Error'})
    }
}
const putTransection = async(req,res,next)=>{
    try {
       const id = req.params.id;
       const newStatus = req.body.newStatus

       const updateTransection = await Transection.findByIdAndUpdate(
        id,
        {status:newStatus},
        {new:true}
       )
       res.status(203).json({message:'Product is successfully updated ',transection:updateTransection})
    } catch (error) {
       res.status(500).json({message:'Server Error'})
    }
}
const deleteTransection = async(req,res,next)=>{
    try {
       const id = req.params.id;
       const deleteTransection = await Transection.findByIdAndDelete(id)

       if(!deleteTransection){
        res.status(404).json({message:'Transection not found'})
       }else{
        res.status(203).json({message:'Transection deleted successfully'})
       }
    } catch (error) {
       res.status(500).json({message:'Server Error'})
    }
}  



module.exports = {
    health,
    getTransection,
    postTransection,
    putTransection,
    deleteTransection
}   