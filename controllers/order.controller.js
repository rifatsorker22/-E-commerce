const Order = require('../model/order.model')
const Product = require('../model/product.model')

const health = async(req,res,next)=>{
    try {
        res.status(200).json({message:'Order api is healthy'})
    } catch (error) {
        res.status(500).json({messgae:'server Error'})
    }
} 
const getByOrderId = async(req,res,next)=>{
try {
    const id = req.params.id;
    const order = await Order.findById(id)

    if(!order){
        res.status(404).json({message:'Order not found'})
    }else{
        res.status(200).json({order:order})
    }
} catch (error) {
    res.status(500).json({message:'Server Error'})
}
}
const getOrder = async(req,res,next)=>{
    try {
     const order = await Order.find()

     if(order === 0){
        res.status(200).json({message:'Order not found'})
     }else{
        res.status(200).json({order:order})
     }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }  
}
const patchOrder = async(req,res,next)=>{
    try {
      const id = req.params.id;
      const order = await Order.findById(id)

      if(!order){
        res.status(404).json({message:'Order not found'})
      }else{
        order.status = req.body.status
        const updateOrder = await order.save()
        res.status(203).json({message:'order updated',updateOrder})
      }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
const deleteOrder = async(req,res,next)=>{
    try {
      const id = req.params.id;
      const deleteOrder = await Order.findByIdAndDelete(id)

      if(!deleteOrder){
        res.status(404).json({message:'Order not found'})
      }else{
        res.status(203).json({message:'order deleted Successfully'})
      }
    } catch (error) {
        res.status(500).json({message:'Server Error'})
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

        res.status(201).json(savedOrder); // Send the saved order back as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


module.exports = {
    health,
    getByOrderId,
    getOrder,
    postOrder,
    patchOrder,
    deleteOrder
}