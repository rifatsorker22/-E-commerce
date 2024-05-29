const Address = require('../model/address.model')




const getAll = async(req,res,next)=>{
    try {
        const address = await Address.find()

        if(address==0){
            res.status(200).json({
                message:'Addres is empty'
            })
        }else{
            res.status(200).json({
                message:'All Address',
                Address: address
            })
        }
    } catch (e) {
        next(e)
    }
}
const create = async(req,res,next)=>{
    try {
        const {street,city,state,postalCode,country} =req.body

        if(!street || !city ||!state||!postalCode||!country){
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
                Address: address
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

        if(!deleteAddress){
            res.status(404).json({
                message:'Address no0t found',

            })
        }else{
            res.status(200).json({
                message:'Address Deleted Successfully',
                delete: deleteAddress

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