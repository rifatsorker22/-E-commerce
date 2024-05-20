const Cart = require('../model/cart.model')
const Product  = require('../model/product.model')


const getCart = async(req,res,next)=>{
try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({userId})

    if(!cart){
        res.status(404).json({message:'Cart not found'})
    }else{
        res.status(200).json(cart)
    }

} catch (error) {
    res.status(500).json({message:' Server Error'})
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
    res.status(201).json({message:'Product added in cart succcessfully',cart})

} catch (error) {
    console.log(error)
    res.status(500).json({message:'Server Error'})
}
}
const deleteCart = async(req,res,next)=>{
    try {
      const userId = req.params.userId
      const cart = await Cart.findOneAndDelete({userId})

      if(!cart){
        res.status(404).json({message:'Cart not found'})
      }else{
        res.status(200).json({message:'Cart deleted sucessfully'})
      }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
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
                res.status(200).json({ message: 'Item removed from cart successfully' });
        }
       }
       
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {
    getCart,
    postCart,
    deleteCart,
    deleteCartItem
} 