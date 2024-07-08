const Refund = require('../model/refund.model')



const getAllRefund = async(req,res,next)=>{
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const skip = (page - 1)* limit
        const refund = await Refund.find().skip(skip).limit(limit)
        const totalItem = await Refund.countDocuments()

        const totalPage  = Math.ceil(totalItem / limit)

        const baseUrl = `${req.protocol}://${req.get('host')}`

        if(refund === 0){
            res.status(200).json({message:'Refund is empty'})
        }else{
            res.status(200).json({
                message: ` All refund`,
                refund:refund,
                pagination:{
                  currentPage: page,
                  totalItem: totalItem,
                  totalPage: totalPage,
                  hasPrev:(page > 1) ? page - 1 : null,
                  hasNext: (page < totalPage) ? page + 1 : null
                },
                links:{
                    self: `${baseUrl}/refund/v1?page=${page}&limit=${limit}`,
                    prev: (page > 1) ? `${baseUrl}/refund/v1?page=${page-1}&limit=${limit}`:null,
                    next : (page < totalPage) ? `${baseUrl}/refund/v1?page=${page+1}&limit=${limit}`:null

                }
            })
        }
    } catch (error) {
       next(error)
    }
}
const getRefundByStatus = async(req,res,next)=>{
    try {
        const {status} =req.params;
        const refund = await Refund.findOne({status})
        const baseUrl = `${req.protocol}://${req.get('host')}`
        if(!status){
            res.status(404).json({message:'status is missing'})
        }else{
            res.status(200).json({
                message:'Refund Found',
                refund:refund,
                links:{
                    self:`${baseUrl}/refund/v1/${refund.status}`,
                    allRefund: `${baseUrl}/refund/v1`,
                    createRefund: `${baseUrl}/refund/v1`,
                }
            })
        }

    } catch (error) {
        next(error)
    }
}
const postRefund = async(req,res,next)=>{
    try {
        const {transection_id,amount,status,reason} = req.body;
        const refund = new Refund({
            transection_id,
            amount,
            status,
            reason
        })
        await refund.save()
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(201).json({
            message: ' New refund is created',
            refund: refund,
            links:{
               self: `${baseUrl}/refund/v1/${refund.id}`,
               allRefund: `${baseUrl}/refund/v1`,
        
            }
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
const updateRefund = async(req,res,next)=>{
    try {
       const id = req.params.id
       const {amount,status,reason} = req.body 
       const baseUrl = `${req.protocol}://${req.get('host')}`
       const updateRefund = await Refund.findByIdAndUpdate(
        id,
        {
            amount,
            status,
            reason
        },{new:true}
       )
       if(!updateRefund){
        res.status(404).json({
            message:'Refund Update successfully'
        })
       }else{
        res.status(200).json({
            message:'updated refund successfully',
            updateRefund: updateRefund,
            links:{
                self: `${baseUrl}/refund/v1/${updateRefund.id}`,
                allRefund: `${baseUrl}/refund/v1`,
                createRefund: `${baseUrl}/refund/v1`,
            }
         })
       }
    } catch (error) {
        next(error)
    }
}
const deleteRefund = async (req,res,next) => {
    try {
        const id  = req.params.id;
        const deletedRefund = await Refund.findByIdAndDelete(id);
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        if (!deletedRefund) {
            return res.status(404).json({
                message: 'Refund Not found'
            });
        }

        res.status(200).json({
            message: 'Refund Deleted successfully',
            deletedRefund: deletedRefund,
            links: {
                allRefund: `${baseUrl}/refund/v1`,
                createRefund: `${baseUrl}/refund/v1`
            }
        });
    } catch (error) {
        next(error); // Pass any caught error to Express error handling middleware
    }
};

module.exports ={

    getAllRefund,
    getRefundByStatus,
    postRefund,
    updateRefund,
    deleteRefund

}