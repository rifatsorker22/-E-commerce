const paymentSource = require('../model/pSource.model')


const getById = async(req,res,next)=>{
try {
    const id = req.params.id;
    const payment = await paymentSource.findById(id)

    if(!payment){
        res.status(404).json({message:'payment not found'})
    }else{
        res.status(200).json({
            message:'Payment Found',
            payment:payment,
            links:{
                self:`/payment/v1/${id}`,
                asyncllPayment: `/payment/v1`,
                updatePayment: `/payment/v1/${id}`,
                deletePayment: `/payment/v1/${id}`
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
        const limit = +req.query.limit || 10
        const skip = (page - 1) * limit

        

       const payments = await paymentSource.find().skip(skip).limit(limit)
       const totalPayments = await paymentSource.count()

       const totalPage = Math.ceil(totalPayments/limit)

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
              self: `/payment/v1?page=${page}&limit=${limit}`,
              next: (page < totalPage)?`/payment/v1?page=${page+1}&limit=${limit}`:null,
              prev: (page > 1)?`/payment/v1?page=${page-1}&limit=${limit}`: null
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
    res.status(201).json({
        message: 'New Payment is created',
        payment:newPayment,
        links:{
            self: `/payment/v1/${newPayment._id}`,
            allPayments: `/payment/v1`,
            updatePayment: `/payment/v1/${newPayment._id}`,
            deletePayment: `/payment/v1/${newPayment._id}`
        }
    })

    } catch (error) {
        next(error)
    }
}
const putPayment = async(req,res,next)=>{
    try {
    const id = req.params.id;
    const updatePayment = await paymentSource.findByIdAndUpdate(id,req.body,{new:true})

    if(!updatePayment){
        res.status(404).json({message:"Payment not updated"})
    }else{
        res.status(203).json({
            message:"Payment is updated",
            updatePayment:updatePayment,
            links:{
              self: `/payment/v1/${updatePayment._id}`,
              allPayments: `/payment/v1`,
              createPayment: `/payment/v1`,
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

    if(!deletePayment){
        res.status(404).json({message:'Payment not found'})
    }else{
        res.status(203).json({
            message:'Payment deleted successfully',
            Delete : deletePayment,
            links:{
                allPayments: `/payment/v1`,
                createPayment: `/payment/v1`,
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