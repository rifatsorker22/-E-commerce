const Auth = require('../model/auth.model')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const register = async(req,res,next)=>{
    try {
        const {email,password,role} = req.body
        const user = await Auth.findOne({email})

        if(user){
            res.status(404).json({
                message: 'User already exist'
            })
        }else{
            if(!email || !password ||!role){
                res.status(404).json({message:'Invaild Credientials'})
            }else{
                bcrypt.hash(password, saltRounds,async function(err, hash){
                    if(err){
                        res.status(404).json({message: 'Invalid credentials'})
                    }else{
                        const newUser = new Auth({
                            email,
                            password:hash,
                            role:role ||'user'
                        })
                        await newUser.save()
                        const baseUrl = `${req.protocol}://${req.get('host')}`
                        res.status(201).json({
                            message: 'Registration successfull',
                            User: newUser,
                            links:{
                                self: `${baseUrl}api/register/v1/${newUser.id}`,
                                login: `${baseUrl}api/login/v1`,
                                logout: `${baseUrl}api/logout/v1`
                            }
                        })
                    }

                })
            }
        }

        
    } catch (error) {
        next(error)
    }
}
  
const login = async (req,res,next)=>{
    try {
        const {email,password}= req.body;
        const user = await Auth.findOne({email})

        if(!user){
            res.status(404).json({message: 'User not found'})
        }else{
            bcrypt.compare(password, user.password).then(function(result) {
                if(!result){
                    res.status(404).json({message: 'Wrond Password'})
                }else{
                    const token = jwt.sign({userId:user._id,userRole:user.role},"secret-key")

                      const baseUrl = `${req.protocol}://${req.get('host')}`
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
        const baseUrl = `${req.protocol}://${req.get('host')}`
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