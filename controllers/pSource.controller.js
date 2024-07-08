const paymentSource = require('../model/pSource.model')


const getById = async(req,res,next)=>{
try {
    const id = req.params.id;
    const payment = await paymentSource.findById(id)
    const baseUrl = `${req.protocol}://${req.get('host')}`
    if(!payment){
        res.status(404).json({message:'payment not found'})
    }else{
        res.status(200).json({
            message:'Payment Found',
            payment:payment,
            links:{
                self:`${baseUrl}/payment/v1/${id}`,
                asyncllPayment: `${baseUrl}/payment/v1`,
                updatePayment: `${baseUrl}/payment/v1/${id}`,
                deletePayment: `${baseUrl}/payment/v1/${id}`
            }
        })
    }
} catch (error) {
    next(error)
}
}
const getPayment = async(req,res,next)=>{
    try {

        const page = +req.query.page || 1
        const limit = +req.query.limit || 3
        const skip = (page - 1) * limit
       const payments = await paymentSource.find().skip(skip).limit(limit)
       const totalPayments = await paymentSource.countDocuments()
       const totalPage = Math.ceil(totalPayments/limit)
       const baseUrl = `${req.protocol}://${req.get('host')}`



       if(payments === 0){
        res.status(404).json({message:"Payment not found"})
       }else{
        res.status(200).json({
            message:'All payments',
            payments:payments,
            paginations:{
                currentPage: page,
                totalPayments: totalPayments,
                totalPage: totalPage,
                hasNextPage: page < totalPage,
                hasPrevPage: page > 1
            },
            links:{
              self: `${baseUrl}/payment/v1?page=${page}&limit=${limit}`,
              next: (page < totalPage) ? `${baseUrl}/payment/v1?page=${page+1}&limit=${limit}`:null,
              prev: (page > 1) ? `${baseUrl}/payment/v1?page=${page-1}&limit=${limit}`: null
            }
        })
       }
    } catch (error) {
        next(error)
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
    const baseUrl = `${req.protocol}://${req.get('host')}`
    res.status(201).json({
        message: 'New Payment is created',
        payment:newPayment,
        links:{
            self: `${baseUrl}/payment/v1/${newPayment._id}`,
            allPayments: `${baseUrl}/payment/v1`,
            updatePayment: `${baseUrl}/payment/v1/${newPayment._id}`,
            deletePayment: `${baseUrl}/payment/v1/${newPayment._id}`
        }
    })

    } catch (error) {
        next(error)
    }
}
const putPayment = async(req,res,next)=>{
    try {
    const id = req.params.id;
    const {customar_id,type,last_four_digits}=req.body
    const updatePayment = await paymentSource.findByIdAndUpdate(id,
        {$set:{
            customar_id:customar_id,
            type:type,
            last_four_digits:last_four_digits
        }}
        ,{new:true})
    const baseUrl = `${req.protocol}://${req.get('host')}`
    if(!updatePayment){
        res.status(404).json({message:"Payment not updated"})
    }else{
        res.status(203).json({
            message:"Payment is updated",
            updatePayment:updatePayment,
            links:{
              self: `${baseUrl}/payment/v1/${updatePayment._id}`,
              allPayments: `${baseUrl}/payment/v1`,
              createPayment: `${baseUrl}/payment/v1`,
            }
        })
    }

    } catch (error) {
        next(error)
    }
}
const deletePayment = async(req,res,next)=>{
    try {
    const id = req.params.id;
    const deletePayment = await paymentSource.findByIdAndDelete(id)
    const baseUrl = `${req.protocol}://${req.get('host')}`
    if(!deletePayment){
        res.status(404).json({message:'Payment not found'})
    }else{
        res.status(203).json({
            message:'Payment deleted successfully',
            Delete : deletePayment,
            links:{
                allPayments: `${baseUrl}/payment/v1`,
                createPayment: `${baseUrl}/payment/v1`,
            }
        })
    }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getById,
    getPayment,
    postPayment,
    putPayment,
    deletePayment
}