import jwt from 'jsonwebtoken';
import {createError}  from '../utils/error.js'


export const verifyToken = (req, resp, next) =>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if(err) return next(createError(403, "Token is not valid"))
        req.user = user;
        next()
    })
}

export const verifyUser = (req, resp, next) =>{

    verifyToken(req, resp, next, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }

    })
}

export const verifyAdmin = (req, resp, next) =>{

    verifyToken(req, resp, next, ()=>{

        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }

    })
}


