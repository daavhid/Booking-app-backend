import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoom, roomAvailability, updateRoom } from "../controllers/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.route('/:hotelId').post(verifyAdmin,createRoom)
router.route('/').get(getAllRooms)
router.route('/:id').get(getRoom).patch(verifyAdmin,updateRoom)
router.route('/availability/:id').patch(roomAvailability)
router.route('/:id/:hotelId').delete(verifyAdmin,deleteRoom)
router.route('*').get((req,res)=>{
    res.send('Page not Found')
})

export default router