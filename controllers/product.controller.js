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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalItem = await Product.countDocuments();
        const totalPage = Math.ceil(totalItem / limit);
        const item = await Product.find().skip(skip).limit(limit);
      
        const createLink = (page) => `/items?page=${page}&limit=${limit}`;
      
        const links = {
          self: createLink(page),
          first: createLink(1),
          last: createLink(totalPage)
        };
      
        if (page > 1) {
          links.previous = createLink(page - 1);
        }
      
        if (page < totalPage) {
          links.next = createLink(page + 1);
        }
      
        res.status(200).json({
          item,
          page,
          limit,
          totalItem,
          totalPage,
          links
        });
      
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