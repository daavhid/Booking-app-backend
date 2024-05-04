import express from "express"
import { countByCities, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.route('/').get(getAllHotels).post(verifyAdmin,createHotel)
router.route('/find/:id').get(getHotel).patch(verifyAdmin,updateHotel).delete(verifyAdmin,deleteHotel)

router.route('/countByCities').get(countByCities)
router.route('/countByType').get(countByType)
router.route('/getHotelRooms/:id').get(getHotelRooms)


export default router