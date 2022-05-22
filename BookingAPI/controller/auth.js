import User from "../models/modelUsers.js"
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, resp, next)=>{

    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword
        })
        await newUser.save();
        resp.status(200).send("User created successful!")
    } catch (error) {
        next(error)
        
    }
}


export const login = async (req, resp, next)=>{

    try {
        const user = await User.findOne({username: req.body.username});

        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordCorrect) return next(createError(400, "Password incorrect!"));
        console.log(user)

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY)

        const {password, isAdmin, ...otherDetails} = user._doc;

        resp.cookie("access_token", token, {
            httpOnly : true
        }).status(200).send({...otherDetails})
       
    } catch (error) {
        next(error)
        
    }
}