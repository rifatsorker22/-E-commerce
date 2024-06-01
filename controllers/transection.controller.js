const Transection = require('../model/transection.model')


const getById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const transction = await Transection.findById(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!transction){
            res.status(200).json({
                message:'Transection Not found'
            })
        }else{
              res.status(200).json({
                message:'Transection Found',
                Transection: transction,
                links:{
                    self: `${baseUrl}/transection/v1/${transction.id}`,
                    allTransection: `${baseUrl}/transection/v1`,
                    createTransection: `${baseUrl}/transection/v1/`
                }
              })  
        }
    } catch (error) {
        next(error)
    }
}
const getTransection = async(req,res,next)=>{
 try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10
    const skip = (page - 1) * limit


    const transection = await Transection.find().skip(skip).limit(limit)
    const totalTransection = await Transection.count()
    const totalPage = Math.ceil(totalTransection / limit)

    const baseUrl = `${req.protocol}://${req.get('host')}`

    if(transection === 0){
        res.status(404).json({message:'transection not found'})
    }else{
        res.status(200).json({
            message:'All Transection found',
            transection:transection,
            paginations:{
                currentPage: page,
                totalPage: totalPage,
                totalTransection: totalTransection,
                hasPrev:(page > 1 ) ? page - 1 : null,
                hasNext: (page < totalPage) ? page+1 : null


            },
            links:{
                self: `${baseUrl}/transection/v1?page=${page}&limit=${limit}`,
                prev: (page > 1 ) ? `${baseUrl}/transection/v1?page=${page -1}&limit=${limit}` : null,
                next: (page < totalPage) ? `${baseUrl}/transection/v1?page=${page +1}&limit=${limit}` : null

            }
        })
    }
 } catch (error) {
    next(error)
 }
}
const postTransection = async(req,res,next)=>{
    try {
       const {customar_id,payment_source_id,amount,currency,description}=req.body

       const newTransection = new Transection({
        customar_id,
        payment_source_id,
        amount,
        currency,
        description
       })
        await newTransection.save()
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(201).json({
            message:'New Transection Created',
            Transection:newTransection,
            links:{
              self: `${baseUrl}/transection/v1/${newTransection.id}`,
              allTransection: `${baseUrl}/transection/v1`,
              updateTransection : `${baseUrl}/transection/v1/${newTransection.id}`
            }
    })
    } catch (error) {
       next(error)
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
       const baseUrl = `${req.protocol}://${req.get('host')}`
       res.status(203).json({
        message:'Product is successfully updated ',
        transection:updateTransection,
        links:{
            self: `${baseUrl}/transection/v1/${updateTransection.id}`
        }
    })
    } catch (error) {
        next(error)
    }
}
const deleteTransection = async(req,res,next)=>{
    try {
       const id = req.params.id;
       const deleteTransection = await Transection.findByIdAndDelete(id)
       const baseUrl = `${req.protocol}://${req.get('host')}`
       if(!deleteTransection){
        res.status(404).json({
            message:'Transection not found'
        })
       }else{
        res.status(203).json({
            message:'Transection deleted successfully',
            Transection: deleteTransection,
            links:{
                allTransection: `${baseUrl}/transection/v1`,
                createTransection: `${baseUrl}/transection/v1/`
            }
        })
       }
    } catch (error) {
        next(error)
    }
}  



module.exports = {
    getById,
    getTransection,
    postTransection,
    putTransection,
    deleteTransection
}   