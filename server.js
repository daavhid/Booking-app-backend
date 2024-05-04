import express from 'express'
import dotenv from 'dotenv'
import { connection } from './connect.js'
import authRoute from './api/routes/auth.js'
import usersRoute from './api/routes/users.js'
import hotelsRoute from './api/routes/hotels.js'
import roomsRoute from './api/routes/rooms.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
dotenv.config()


const PORT = process.env.PORT || 3000

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)

app.use('*',(req,res,next)=>{
    res.send('Page not Found')
    next()
})

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || 'something went wrong'
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
    })
})


const start = async()=>{
    try{
       await connection(process.env.MONGO_URI)
       app.listen(PORT,()=>{
        console.log(`Connected to PORT ${PORT} server`)
       })

    }catch(err){
        console.log(err)
    }
}

start()

