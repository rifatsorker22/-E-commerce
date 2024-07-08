const Product = require('../model/product.model')


const getProductById = async(req,res,next)=>{
try {
    const id = req.params.id;
    const product = await Product.findById(id)

    const baseUrl = `${req.protocol}://${req.get('host')}`

    const responses = {
        data: product,
        links: {
            self:`${baseUrl}/products/v1/${product.id}`,
            collections:`${baseUrl}/products/v1`,
            update:`${baseUrl}/products/v1/${product.id}`,
            delete:`${baseUrl}/products/v1/${product.id}`
        }
    }

    if(!product){
        res.status(404).json({
            message:'Product Not Found',
            links:{
                self: `${baseUrl}/products/v1/${product.id}`,
                allProduct: `${baseUrl}/products/v1`,
                createProduct: `${baseUrl}/products/v1`
            }
        
        })
    }else{
        res.status(200).json(responses)
    }
} catch (error) {
  next(error)
}
}
const getProduct = async (req,res,next)=>{
    try {
        const page = +req.query.page ||1 
        const limit = +req.query.limit || 10
        const skip = (page -1) * limit
        const allproduct = await Product.find().skip(skip).limit(limit)
        const totalItems = await Product.countDocuments()
        const totalPage = Math.ceil(totalItems/limit)

        const baseUrl = `${req.protocol}://${req.get('host')}`

        res.status(200).json({
            message:'All package',
            allPackage: allproduct,
            pagination:{
                currentPage: page,
                totalItems: totalItems,
                totalPage: totalPage,
                hasPrev: (page > 1) ? page - 1: null,
                hasNext: (page < totalPage) ? page +1: null
            },
            links:{
               self: `${baseUrl}/products/v1?page=${page}&limit=${limit}`,
               hasPrev: (page > 1) ? `${baseUrl}/products/v1?page=${page-1}&limit=${limit}`: null,
               hasNext: (page < totalPage) ? `${baseUrl}/products/v1?page=${page+1}&limit=${limit}`: null
            }
        })
      
      } catch (error) {
        next(error);
      }
      
}
const postProduct = async (req, res, next) => {
    try {
        const { name, quantity, price, description, category } = req.body;
        
        // Input validation
        if (!name || !quantity || !price || !description || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Create new product
        const product = new Product({
            name,
            quantity,
            price,
            description,
            category
        });
        
        // Save product to database
        await product.save();

        const baseUrl = `${req.protocol}://${req.get('host')}`

        const responses ={
            message: 'Product is created',
            data: product,
            links:{
                self:`${baseUrl}/products/v1/`,
                collections:`${baseUrl}/products/v1`,
                update:`${baseUrl}/products/v1/${product.id}`,
                delete:`${baseUrl}/products/v1/${product.id}`
            }
        }
        
        // Respond with the newly created product
        res.status(201).json(responses);
    } catch (error) {
        
        next(error)
    }
};
const putProduct = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const product= await Product.findById(id)
        const {name,quantity,price,description,category}=req.body;
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!product){
           res.status(402).json({
            message:'Product not found',
            links:{
                self: `${baseUrl}/products/v1/${product.id}`,
                allproduct: `${baseUrl}/products/v1`,
                createproduct: `${baseUrl}/products/v1`
            }
        })
        }else{
            const update = await Product.findByIdAndUpdate(
                id,
                {$set:{
                    name:name,
                    quantity:quantity,
                    price:price,
                    description:description,
                    category:category

                }},
                {new:true}
                )
                res.status(203).json({
                    message:'Update Successfully',
                    data: update,
                    links:{
                        self: `${baseUrl}/products/v1/${product.id}`,
                        allProduct: `${baseUrl}/products/v1`,
                        deleteProduct: `${baseUrl}/products/v1/${product.id}`,
                        createProduct:`${baseUrl}/products/v1`

                    }
                
                })
    }
    } catch (error) {
        next(error)
    }
}
const deleteProduct = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!id){
            res.status(404).json({
                message: 'Product not found for delete',
                links:{
                    self:`${baseUrl}products/v1/${product.id}`,
                    allproduct:`${baseUrl}/products/v1`,
                    createProduct:`${baseUrl}/products/v1`
                }
            
            })
        }else{
           await Product.findByIdAndDelete(id)
            res.status(203).json({
                message: 'Delete successfully',
                linlks:{
                    allproduct:`${baseUrl}/products/v1`,
                    createProduct:`${baseUrl}/products/v1`
                }
            
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {

    getProductById,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}