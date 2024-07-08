const Address = require('../model/address.model')




const getAll = async(req,res,next)=>{
    try {
        const page = +req.query.page ||1 
        const limit = +req.query.limit || 10
        const skip = (page -1)*limit
        const allAddress = await Address.find().skip(skip).limit(limit)
        const totalItems = await Address.countDocuments()
        const totalPage = Math.ceil(totalItems/limit)

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`

        if(allAddress==0){
            res.status(200).json({
                message:'Addres is empty'
            })
        }else{
            res.status(200).json({
                message:'All Address',
                Address: allAddress,
                pagination:{
                    currentPage: page,
                    totalItems:totalItems,
                    totalPage: totalPage,
                    hasPrev: (page > 1 ) ? page -1 : null,
                    hasNext: (page < totalPage ) ? page + 1: null

                },
                links:{
                    self: `${baseUrl}?page=${page}&limit=${limit}`,
                    prev: (page > 1 ) ?`${baseUrl}?page=${page-1}&limit=${limit}`:null,
                    next: (page < totalPage ) ? `${baseUrl}?page=${page+1}&limit=${limit}`:null

                }
            })
        }
    } catch (e) {
        next(e)
    }
}
const create = async(req,res,next)=>{
    try {
        const {street,city,state,postalCode,country} =req.body;
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`

        if(!street || !city || !state || !postalCode || !country) {
            res.state(402).json({
                message:'Invalid cridentials'
            })
        }else{
            const address = new Address({
                street,
                city,
                state,
                postalCode,
                country
            })
            await address.save()
            res.status(201).json({
                message:'New Address created',
                Address: address,
                links:{
                  self: `${baseUrl}`,
                  allAddress: `${baseUrl}`
                }
            })
        }
    } catch (e) {
        next(e)
    }
}
const updateById = async(req,res,next)=>{
    try {
        const {id} =req.params
        const {street,city,state,postalCode,country} = req.body
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
        if(!street || !city ||!state||!postalCode||!country){
            res.state(402).json({
                message:'Invalid cridentials'
            })
        }else{
            const updateAddress = await Address.findByIdAndUpdate(
                id,
                {
                    $set:{
                        street:street,
                        city:city,
                        state:state,
                        postalCode:postalCode,
                        country:country
                    }
                },{new:true}
            )
            res.status(200).json({
                message:'Address updated Successfully',
                Update: updateAddress,
                links:{
                    self:`${baseUrl}/${updateAddress.id}`

                }

            })
        }

    } catch (e) {
        next(e)
    }
}
const deleteByID = async(req,res,next)=>{
    try {
        const {id} =req.params

        const deleteAddress = await Address.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
        if(!deleteAddress){
            res.status(404).json({
                message:'Address no0t found',

            })
        }else{
            res.status(200).json({
                message:'Address Deleted Successfully',
                delete: deleteAddress,
                links:{
                    create: `${baseUrl}`,
                    allAddress: `${baseUrl}`
                }

            })
        }
    } catch (e) {
        next(e)
    }
}



module.exports = {
    getAll,
    create,
    updateById,
    deleteByID
}