const Package = require('../model/package.model')

const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const package = await Package.findById(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(!package){
            res.status(400).json({
                message:'package not found'
            })
        }else{
            res.status(200).json({
                message:'package found',
                package: package,
                links:{
                    self:`${baseUrl}/package/v1/${package.id}`,
                    allPackage:`${baseUrl}/package/v1`,
                    create:`${baseUrl}/package/v1`,
                    update:`${baseUrl}/package/v1/${package.id}`,
                    delete:`${baseUrl}/package/v1/${package.id}`
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
        const skip = (page -1) * limit
        const allPackage = await Package.find().skip(skip).limit(limit)
        const totalItems = await Package.countDocuments()
        const totalPage = Math.ceil(totalItems/limit)

        const baseUrl = `${req.protocol}://${req.get('host')}`

        res.status(200).json({
            message:'All package',
            allPackage: allPackage,
            pagination:{
                currentPage: page,
                totalItems: totalItems,
                totalPage: totalPage,
                hasPrev: (page > 1) ? page - 1: null,
                hasNext: (page < totalPage) ? page +1: null
            },
            links:{
               self: `${baseUrl}/package/v1?page=${page}&limit=${limit}`,
               hasPrev: (page > 1) ? `${baseUrl}/package/v1?page=${page-1}&limit=${limit}`: null,
               hasNext: (page < totalPage) ? `${baseUrl}/package/v1?page=${page-1}&limit=${limit}`: null
            }
        })

    } catch (error) {
        
        next(error)
    }
}
const create = async(req,res,next)=>{
    try {
        const { weight, dimensions } = req.body;
        
        // Validate input
        if (!weight || !dimensions) {
            return res.status(400).json({ error: 'Weight and dimensions are required' });
        }
        
        // Create new package instance
        const newPackage = new Package({
            package: {
                weight,
                dimensions
            }
        });
            await newPackage.save()
            const baseUrl = `${req.protocol}://${req.get('host')}`
            res.status(201).json({
                message:'Package is created',
                package: newPackage,
                links:{
                    self:`${baseUrl}/package/v1/${newPackage.id}`,
                    allPackage: `${baseUrl}/package/v1`
                }
            })
        

        
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const updateById = async(req,res,next)=>{
    try {
        const {id} =req.params
        const {weight,dimensions} = req.body
        const updatePackage = await Package.findByIdAndUpdate(
            id,
            {
                $set:{
                    package: {
                        weight:weight,
                        dimensions:dimensions
                    }
                }
            },{new:true}
        )
        const baseUrl = `${req.protocol}://${req.get('host')}`

        res.status(200).json({
            message:'Updated successfully',
            UpdatedPackage: updatePackage,
            links:{
                self: `${baseUrl}/package/v1/${updatePackage.id}`
            }
        })

    } catch (error) {
        next(error)
    }
}
const deletetById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const package = await Package.findByIdAndDelete(id)
        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(!package){
            res.status(404).json({
                message:'package not found'
            })
        }else{
            res.status(200).json({
                message:'package deleted successfully',
                DeletedPackage: package,
                links:{
                    allPackage:`${baseUrl}/package/v1`,
                    create:`${baseUrl}/package/v1`,
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
    deletetById
}