
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const createAccount = async (req,res)=> {
    const {fullName, email, password} = req.body
    if(!fullName) {
        return res.status(400).json({error: true, message : "Full Name is required"})
    }
    if(!email) {
        return res.status(400).json({error: true, message: "Email is required"})
    }
    if(!password) {
        return res.status(400).json({error: true, message: "Password is required"})
    }

    const isUser = await User.findOne({email: email})
    
    if (isUser){
        return res.json({
            error: true,
            message : "User already exist"
        })
    }
    
    const user = new User({
        fullName,
        email,
        password
    })

    await user.save()

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "36000m"
    })

    return res.json({
        error:false,
        user,
        accessToken,
        message: "Registration Successful"
    })
}

const Login =  async(req,res)=>{
  const {email, password} = req.body
  if(!email) {
    return res.status(400).json({error: true, message: "Email is required"})
  }
  if(!password) {
    return res.status(400).json({error: true, message: "password is required"})
  }

  const userInfo = await User.findOne({email : email})

  if(!userInfo) {
    return res.status(400).json({error :true, message : "User not found"})
  }
 
  if(userInfo.email == email && userInfo.password == password) {
    const user = {user : userInfo}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "36000M"
    })
    
   
  
    return res.json({
        error : false,
        message: "Login Successful",
        email,
        accessToken,
        isAdmin : userInfo.admin
    })

  }else {
    return res.json({
        error : true,
        message : "Invalid Credentials"
    })
  }
}

const getUser =   async (req,res)=> {
   
    const {user} = req.user
    console.log("user",user)
    const isUser = await User.findOne({_id: user._id})

    if(!isUser) {
        return res.sendStatus(401)
    }
    return res.json({
        user : {fullName : isUser.fullName,
                email : isUser.email,
                isAdmin : isUser.admin,
                createdOn : isUser.createOn},
        message : "validated"
    })
}

export {createAccount, Login, getUser}