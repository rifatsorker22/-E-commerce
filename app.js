const express = require('express')
const port = 4444;
const hostName = '127.0.0.1'
const app = express()
const authRouter = require('./routes/auth.router')
const userRouter = require('./routes/user.router')
const productRouter = require('./routes/product.router')
const cartRouter = require('./routes/cart.router')
const orderRouter = require('./routes/order.router')
const paymentRouter = require('./routes/payment.route')
const transectionRouter = require('./routes/transection.route')
const refundRouter = require('./routes/refund.route')
const refundReasonRouter = require('./routes/refundReason.route')
const feedbackRouter = require('./routes/feedback.route')
const healthRouter = require('./routes/Health.route')
require('./db/connect')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(healthRouter)
app.use(authRouter)
app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(orderRouter)
app.use(paymentRouter)
app.use(transectionRouter)
app.use(refundRouter)
app.use(refundReasonRouter)
app.use(feedbackRouter)



app.use((req,res,next)=>{
    res.status(404).json({
        message:'Route not found'
    })
})
app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({message: 'Server error'})
    }
})


app.listen(port,hostName,()=>{
    console.log(`your server is running at http://${hostName}:${port}`);
})