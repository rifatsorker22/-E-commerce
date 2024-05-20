const paymentSource = require('../model/pSource.model')

const health = async(req,res,next)=>{
    try {
        res.status(200).json({message:'Paymant source api is healthy'})
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
} 
const getById = async(req,res,next)=>{
try {
    const id = req.params.id;
    const payment = await paymentSource.findById(id)

    if(!payment){
        res.status(404).json({message:'payment not found'})
    }else{
        res.status(200).json({payment:payment})
    }
} catch (error) {
    res.status(500).json({message:'Server Error'})
}
}
const getPayment = async(req,res,next)=>{
    try {
       const payment = await paymentSource.find()

       if(payment === 0){
        res.status(404).json({message:"Payment not found"})
       }else{
        res.status(200).json({payment:payment})
       }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
const postPayment = async(req,res,next)=>{
    try {
    const {customar_id,type,last_four_digits}=req.body

    const newPayment = new paymentSource({
        customar_id,
        type,
        last_four_digits
    })
    await newPayment.save()
    res.status(201).json({payment:newPayment})

    } catch (error) {
                res.status(500).json({message:'Server Error'})
    }
}
const putPayment = async(req,res,next)=>{
    try {
    const id = req.params.id;
    const updatePayment = await paymentSource.findByIdAndUpdate(id,req.body,{new:true})

    if(!updatePayment){
        res.status(404).json({message:"Payment not updated"})
    }else{
        res.status(203).json({updatePayment:updatePayment})
    }

    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
const deletePayment = async(req,res,next)=>{
    try {
    const id = req.params.id;
    const deletePayment = await paymentSource.findByIdAndDelete(id)

    if(!deletePayment){
        res.status(404).json({message:'Payment not found'})
    }else{
        res.status(203).json({message:'Payment deleted successfully'})
    }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

module.exports = {
    health,
    getById,
    getPayment,
    postPayment,
    putPayment,
    deletePayment
}