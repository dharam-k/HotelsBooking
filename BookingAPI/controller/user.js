import User from "../models/modelUsers.js";


export const updateUser = async(req, resp, next) =>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set:req.body }, {new : true});
        resp.status(200).json(updateUser);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req, resp, next) =>{
    try {
        await User.findByIdAndDelete(req.params.id);
        resp.status(200).json('User Deleted');
    } catch (error) {
        next(error)
    }
}

export const getUser = async(req, resp, next) =>{
    try {
        const user = await User.findById(req.params.id);
        resp.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const getUsers = async(req, resp, next) =>{
    try {
        const user = await User.find();
        resp.status(200).json(user);
    } catch (error) {
        next(error)
    }
}