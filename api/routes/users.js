import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser, } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.route('/checkAuthentication').get(verifyToken,(req,res)=>{
//     res.send('You have been authenticated')
// })
// router.route('/checkUser/:id').get(verifyUser,(req,res)=>{
//     res.send('Hello User, You are logged in and yu can delete your account')
// })
// router.route('/checkAdmin/:id').get(verifyAdmin,(req,res)=>{
//     res.send('Hello Admin, You are logged in and you can delete all account')
// })

router.route('/').get(verifyAdmin,getAllUsers)
router.route('/:id').get(verifyUser,getUser).patch(verifyUser,updateUser).delete(verifyUser,deleteUser)

export default router