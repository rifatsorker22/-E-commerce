const User = require('../model/auth.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')



const register = async (req,res,next)=>{
    try {
        const {email,password,role } = req.body;
        const user = await User.findOne({email})

        if(user){
            res.status(404).json({message : 'User is already exist'})
        }else{
            bcrypt.hash(password, saltRounds,async function(err, hash) {
               if(err){
                res.status(404).json({message: 'Somthing went wrong'})
               }else{
                const newUser = new User({
                    email,
                    password:hash,
                    role: role || 'user'

                })
                await newUser.save()

                const baseUrl = `http://127.0.0.1:4444`

                res.status(201).json({
                    message:'User registration successful',
                    data: newUser,
                    links:{
                        self:`${baseUrl}/api/register/v1`,
                       login:`${baseUrl}/api/login/v1`,
                       logout:`${baseUrl}/api/logout/v1`

                    }
                })
               }
            });
        }
    
    } catch (error) {
        next(error)
    }
}
const login = async (req,res,next)=>{
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email})

        if(!user){
            res.status(404).json({message: 'User not found'})
        }else{
            bcrypt.compare(password, user.password).then(function(result) {
                if(!result){
                    res.status(404).json({message: 'Wrond Password'})
                }else{
                    const token = jwt.sign({userId:user._id,userRole:user.role},"secret-key")

                      const baseUrl = `http://127.0.0.1:4444`

                    res.status(200).json(
                        {
                            message:'Login successfull',
                            token:token,
                            links:{
                                self:`${baseUrl}/api/login/v1`,
                                register:`${baseUrl}/api/register/v1`,
                                logout:`${baseUrl}/api/logout/v1`
        
                            }
                        }
                        )
                }
            });
        }
    } catch (error) {
       next(error)
    }
}
const logout = async (req,res,next) => {
    try {
        const baseUrl = `http://127.0.0.1:4444`
            res.status(200).json({ 
                message: "Logout successful",
                self:`${baseUrl}/api/logout/v1`
            
            });
    
        
    } catch (error) {
      next(error)
    }
};


module.exports = {
    register,
    login,
    logout
}