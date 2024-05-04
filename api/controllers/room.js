import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId;
    try{
        const newRoom = await Room.create(req.body)
        try {
            await Hotel.findOneAndUpdate({_id:hotelId},{$push:{rooms:newRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(newRoom)
    }catch(error){
        next(error)
    }
}


export const updateRoom = async(req,res,next)=>{
    const id = req.params.id
    try {
        const updateRoom = await Room.findByIdAndUpdate(id,{$set:req.body},{new:true})
        console.log(req.body)
        res.status(201).json({updateRoom})
    } catch (error) {
        next(error)
    }
}
export const roomAvailability = async(req,res,next)=>{
    const id = req.params.id
    try {
        const updateRoom = await Room.updateOne({'roomNumbers._id':id},{$push:{'roomNumbers.$.unavailableDates':req.body.dates}})
        console.log(req.body)
        res.status(201).json({updateRoom})
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId
    const id = req.params.id
    
    try {
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        }catch(error){
            next(error)
        }
        await Room.findByIdAndDelete(id)
        res.status(201).json({msg:'Room deleted sucessfully'})
    } catch (error) {
        next(error)
    }
}

export const getRoom = async(req,res,next)=>{
    const id = req.params.id
    try {
        const room = await Room.findById(id)
        console.log(req.body)
        res.status(200).json({room})
    } catch (error) {
        next(error)
    }
}

export const getAllRooms = async(req,res,next)=>{
    try {
        const rooms = await Room.find()
        console.log(req.body)
        res.status(200).json({rooms})
    } catch (error) {
        next(error)
    }
}