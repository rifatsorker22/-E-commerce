const Cart = require('../model/cart.model')
const Product  = require('../model/product.model')
const hateos = require('../utils/HATEOS')

const getCart = async(req,res,next)=>{
try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({userId})
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const responses = {
        message: "Cart Items",
        items: cart,
        links: {
           self:`${baseUrl}/cart/v1/${userId}`,
           deleteCart:`${baseUrl}/cart/v1/${userId}`,
        }
    }

    if(!cart){
        res.status(404).json({message:'Cart not found'})
    }else{
        res.status(200).json(responses)
    }

} catch (error) {
    next(error)
}
}
const postCart = async(req, res, next)=> {
try {
    const {userId,productId,quantity}=req.body;

    let cart = new Cart({
        userId,
        items:[],
        totalQuantity:0,
        totalPrice:0
    })

    const product = await Product.findById(productId)

    if(!product){
        res.status(404).json({message:'Product Not Found'})
    }
    const price = product.price

    const totalPrice = price * quantity

    const existingProductIndex = cart.items.findIndex(item => item.productId === productId)

    if(existingProductIndex !== -1){
        cart.items[existingProductIndex].quantity += quantity
        cart.items[existingProductIndex].totalPrice += totalPrice
    }else{
        cart.items.push({
            productId,
            quantity,
            price,
            totalPrice
    })
    }

    cart.totalQuantity += quantity
    cart.totalPrice += totalPrice

    await cart.save()
    const baseUrl = `${req.protocol}://${req.get('host')}`
    res.status(201).json({
        message:'Product added in cart succcessfully',
        cart:cart,
        links:{
            self:`${baseUrl}/cart/v1/${userId}`,
            deleteCart: `${baseUrl}/cart/v1/${userId}`
        }
    })

} catch (error) {
    console.log(error)
    next(error)
} 
}
const deleteCart = async(req,res,next)=>{
    try {
      const userId = req.params.userId
      const cart = await Cart.findOneAndDelete({userId})
      const baseUrl = `${req.protocol}://${req.get('host')}`
      if(!cart){
        res.status(404).json({message:'Cart not found'})
      }else{
        res.status(200).json({
            message:'Cart deleted sucessfully',
            links:{
                createCart:`${baseUrl}/cart/v1`
            }
        })
      }

    } catch (error) {
        next(error)
    }
}
const deleteCartItem = async(req,res,next)=>{
    try {
       const {cartId,itemId} = req.params;

       const cart = await Cart.findById(cartId)
       
       if(!cart){
        res.status(404).json({message:'Cart not found'})
       }else{
        const item = cart.items.find(item => item._id.toString() === itemId)

        if(!item){
         res.status(404).json({message:'Item not found in cart'})
        }else{
            if(item.quantity > 1){
                item.quantity --
                cart.totalQuantity--
                cart.totalPrice -= item.price
               }else{
                const itemIndex = cart.items.findIndex(item => item._id.toString()===itemId)
                cart.items.splice(itemIndex,1)
                cart.totalQuantity --
                cart.totalPrice -= item.price
               }
        
                await cart.save()
                const baseUrl = `${req.protocol}://${req.get('host')}`
                res.status(200).json({ 
                    message: 'Item removed from cart successfully' ,
                    links:{
                        getcart: `${baseUrl}/cart/v1/${cartId}`
                    }
                
                });
        }
       }
       
      } catch (error) {
        next(error)
      }
}

module.exports = {
    getCart,
    postCart,
    deleteCart,
    deleteCartItem
} 