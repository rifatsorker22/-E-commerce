const Inventory = require('../model/inventory.model')


const getById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const inventory = await Inventory.findById(id)

        if(!inventory){
            res.status(404).json({
                message: 'Inventory not found'
            })
        }else{
            res.status(200).json({
                message:'inventory founnd',
                inventory: inventory,
                links:{
                    self: `/inventory/v1/${inventory.id}`,
                    allInventory: `/inventory/v1`,
                    createInventory: `/inventory/v1`,
                    update:`/inventory/v1/${inventory.id}` ,
                    delete: `/inventory/v1/${inventory.id}`

                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const getAll = async(req,res,next)=>{
    try {
        const page = +req.query.page ||1 
        const limit = +req.query.limit || 10
        const skip = (page -1)*limit
        const allInventory = await Inventory.find().skip(skip).limit(limit)
        const totalItems = await Inventory.count()
        const totalPage = Math.ceil(totalItems/limit)

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`

        res.status(200).json({
            message:'All Inventorys',
            Inventorys: allInventory,
            pagination:{
                currentPage:page,
                totalItems:totalItems,
                totalPage: totalPage,
                hasPrev: (page > 1 ) ? page -1 : null,
                hasNext: (page < totalPage ) ? page + 1: null

            },
            links:{
                self:`${baseUrl}?page=${page}&limit=${limit}`,
                prev:(page > 1 ) ? `${baseUrl}?page=${page-1}&limit=${limit}`:null,
                next:(page < totalPage ) ?`${baseUrl}?page=${page+1}&limit=${limit}`:null

            }
        })

    } catch (error) {
        next(error)
    }
}
const create = async(req,res,next)=>{
    try {
        const {name,quantity,price}=req.body;
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
        if(!name || ! quantity||!price){
            res.status(404).json({
                message:'Invalid Credientials'
            })
        }else{
            const newInventory = new Inventory({
                name,
                quantity,
                price
            })
            await newInventory.save()
            res.status(201).json({
                message:'New Inventory created',
                newInventory: newInventory,
                links:{
                    self: `${baseUrl}/${newInventory.id}`,
                    allInventory: `${baseUrl}`,
                    update:`/${baseUrl}/${newInventory.id}` ,
                    delete: `/${baseUrl}/${newInventory.id}`
                }
            })
        }
    } catch (error) {
        next(error)
    }
}
const updateById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const {name,quantity,price}=req.body;
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
        if(!id){
            res.status(404).json({message:'Invalid credientals'})
        }else{
            const updateInvantory = await Inventory.findByIdAndUpdate(
                id,
                {
                    $set:{
                        name:name,
                        quantity:quantity,
                        price: price
                    }
                },
                {new :true}
            )
            res.status(200).json({
                message:'Inventory Updated successfully',
                update: updateInvantory,
                links:{
                    self: `${baseUrl}/${updateInvantory.id}`,
                    delete:`${baseUrl}/${updateInvantory.id}`
                }
            })
        }

    } catch (error) {
        next(error)
    }
}
const deleteById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const deleteInventory = await Inventory.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`
        if(!deleteInventory){
            res.status(402).json({message:'Inventory not found'})
        }else{
            res.status(200).json({
                message: 'Innventory deleted successfully',
                deleteInventory: deleteInventory,
                links:{
                    allInventory: `${baseUrl}`,
                    createInventory: `${baseUrl}`,
                }
            })
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getById,
    getAll,
    create,
    updateById,
    deleteById
}