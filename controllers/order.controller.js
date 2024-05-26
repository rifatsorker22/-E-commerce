const Order = require('../model/order.model')
const Product = require('../model/product.model')


const getByOrderId = async(req,res,next)=>{
try {
    const id = req.params.id;
    const order = await Order.findById(id)

    if(!order){
        res.status(404).json({message:'Order not found'})
    }else{
        res.status(200).json({
            message:'Order Found',
            order:order,
            links:{
                self: `/orders/v1/${id}`,
                update: `/orders/v1/${id}`,
                delete: `/orders/v1/${id}`,
                allOrder: `/orders/v1`,
                createOrder: `/orders/v1`
            }
        
        })
    }
} catch (error) {
    next(error)
}
}
const getOrder = async(req,res,next)=>{
    try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 5;
    const skip = (page - 1) * limit;

     const orders = await Order.find().skip(skip).limit(limit)
     const totalOrders = orders.countDocuments()

     if(orders === 0){
        res.status(200).json({message:'Order not found'})
     }else{
        res.status(200).json({
            message: 'All Orders',
            orders: orders,
            paginations:{
               currentPage:page,
               totalOrders:totalOrders,
               totalPage:Math.ceil(totalOrders/limit),
               prev: (page > 1) ? page-1:null,
               next:(page < totalPage) ? page +1: null
            },
            links:{
              self: `/orders?page=${page}&limit=${limit}`,
              next: (page < totalPage)?`/orders?page=${page+1}&limit=${limit}`:null,
              prev: (page > 1)? `/orders?page=${page-1}&limit=${limit}`: null
            }
        })
     }
    } catch (error) {
        next(error)
    }  
}
const postOrder = async (req, res, next) => {
    try {
        // Extract order details from the request body
        const { userId, cartItems } = req.body;

        // Fetch product details for each item in the cart
        const promises = cartItems.map(async (item) => {
            const product = await Product.findById(item.productId);
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price // Assuming product price is stored in the database
            };
        });

        // Wait for all product details to be fetched
        const itemsWithPrice = await Promise.all(promises);

        // Calculate total price
        const totalPrice = itemsWithPrice.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // Create a new order instance
        const newOrder = new Order({
            userId,
            cartItems: itemsWithPrice,
            totalPrice,
            shippingAddress: req.body.shippingAddress // Assuming shipping address is directly provided in the request body
        });

        // Save the new order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json({ 
            message:'Order created Successfully',
            Orders: savedOrder,
            links:{
                self:`/orders/v1/${savedOrder._id}`,
                AllOrders: `/orders/v1`,
                update: `/orders/v1/${savedOrder._id}`,
                delete:`/orders/v1/${savedOrder._id}`
            }
        
        } ); // Send the saved order back as JSON response
    } catch (error) {
        next(error)
    }
};
const patchOrder = async(req,res,next)=>{
    try {
      const id = req.params.id;
      const order = await Order.findById(id)

      if(!order){
        res.status(404).json({message:'Order not found'})
      }else{
        order.status = req.body.status
        const updateOrder = await order.save()
        res.status(203).json({
            message:'order updated',
            Order:updateOrder,
            links:{
                self:`/orders/v1/${updateOrder._id}`,
                AllOrder:`/orders/v1`,
                createOrder: `/orders/v1`,
                deleteOrder:  `/orders/v1/${updateOrder._id}`
            }
        })
      }
    } catch (error) {
        next(error)
    }
}
const deleteOrder = async(req,res,next)=>{
    try {
      const id = req.params.id;
      const deleteOrder = await Order.findByIdAndDelete(id)

      if(!deleteOrder){
        res.status(404).json({message:'Order not found'})
      }else{
        res.status(203).json({
            message:'order deleted Successfully',
            links:{
                AllOrder:`/orders/v1`,
                createOrder: `/orders/v1`,
            }
        
        })
      }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getByOrderId,
    getOrder,
    postOrder,
    patchOrder,
    deleteOrder
}