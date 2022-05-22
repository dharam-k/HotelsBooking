import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.js";
import {verifyAdmin, verifyToken, verifyUser} from "../utils/verifyToken.js";


const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, resp, next)=>{
//     resp.send("you are logged in!")
// })

// router.get('/checkuser/:id', verifyUser, (req, resp, next)=>{
//     resp.send("you are logged in and you can delete your account!")
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, resp, next)=>{
//     resp.send("you are logged in and you can delete all account!")
// })


//UPDATE
router.put('/:id',verifyUser, updateUser)

//DELETE
router.delete('/:id',verifyUser, deleteUser)

//GET
router.get('/:id',verifyUser, getUser )

//GET ALL  
router.get('/', verifyAdmin, getUsers )


export default router;