import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import {createError} from '../utils/error.js'
import jwt from 'jsonwebtoken'

dotenv.config()

export const register = async(req,res,next)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password,salt)
    
    const userTemp = {
        username:req.body.username,
        email:req.body.email,
        password:hash
    }
    try{
        const newUsers = await  User.create(userTemp)
        res.status(201).send('User has been registered')
    }catch(err){
        next(err)
    }

}

export const login = async(req,res,next)=>{

    try{

        // res.send('login')
        const user = await  User.findOne({username:req.body.username})
        // return next(createError(404,'username not found'))
        if(!user) return next(createError(404,'User not found'));
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError(400,'Wrong password or Username'));

        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)


        const {password,isAdmin,...otherDetails} = user._doc

        res.cookie('access_token',token,{
            httpOnly:true
        }).status(200).json({...otherDetails})
    }catch(err){
        next(err)
    }

}