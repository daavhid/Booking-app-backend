import User from "../models/User.js"
import { verifyToken } from "../utils/verifyToken.js"


export const updateUser = async(req,res,next)=>{
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(201).json({updateUser})
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next)=>{
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id)
        res.status(201).json({msg:'hotel deleted sucessfully'})
    } catch (error) {
        next(error)
    }
}

// export const userAuthentication = (verifyToken,req,res,next)=>{
//     res.send('you have been authenticated')
// }

export const getUser = async(req,res,next)=>{
    const id = req.params.id
    try {
        const user = await User.findById(id)
        console.log(req.body)
        res.status(200).json({user})
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find()
        console.log(req.body)
        res.status(200).json({users})
    } catch (error) {
        next(error)
    }
}