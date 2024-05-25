

const health = (req,res,next)=>{
    try {
        res.status(200).json({status:'UP'})
    } catch (error) {
        next(error)
    }
    
}
module.exports = health