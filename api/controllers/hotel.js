import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


export const createHotel = async(req,res,next)=>{
    try {
        const hotel = await Hotel.create(req.body)
        console.log(req.body)
        res.status(201).json({hotel})
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async(req,res,next)=>{
    const id = req.params.id
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id,{$set:req.body},{new:true})
        console.log(req.body)
        res.status(201).json({updateHotel})
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async(req,res,next)=>{
    const id = req.params.id
    try {
        await Hotel.findByIdAndDelete(id)
        res.status(201).json({msg:'hotel deleted sucessfully'})
    } catch (error) {
        next(error)
    }
}

export const getHotel = async(req,res,next)=>{
    const id = req.params.id
    try {
        const hotel = await Hotel.findById(id)
        console.log(req.body)
        res.status(200).json({hotel})
    } catch (error) {
        next(error)
    }
}

export const getAllHotels = async(req,res,next)=>{
    const {min,max,limit,...others} = req.query
        try{
            const hotels = await Hotel.find({...others,cheapestPrice:{$gte:min ||1,$lte:max||999}}).limit(eval(limit)).sort('cheapestPrice name')
            res.status(200).json({hotels})
        }catch(err){
            next(err)
        }
}

export const countByCities = async(req,res,next)=>{
    const cities = req.query.cities.split(',')
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        })
        )
        res.status(200).json({list})
    }catch(err){
        next(err)
    }
}

export const countByType = async(req,res,next)=>{
    const types = req.query.types.split(',')
    const [hotel,apartments,villas,resort,cabins] = types
    try{
        const list = await Promise.all(types.map(type=>{
            return Hotel.countDocuments({type:type})
        })
        )
        res.status(200).json([{count:list[0],type:hotel},{count:list[1],type:apartments},{count:list[2],type:villas},{count:list[3],type:resort},{count:list[4],type:cabins}])
    }catch(err){
        next(err)
    }
}

export const getHotelRooms = async(req,res,next)=>{
    try{
        const hotel =await  Hotel.findById(req.params.id)
        console.log(hotel)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    }

}