import Room from "../models/modelRooms.js"
import Hotel from "../models/modelHotels.js";
import {createError} from '../utils/error.js';



export const createRoom = async (req, resp, next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRomm = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: {rooms : savedRomm._id}
            })
        } catch (error) {
            next(error)
        }
        resp.status(200).json(savedRomm)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async(req, resp, next) =>{
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set:req.body }, {new : true});
        resp.status(200).json(updateRoom);
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async(req, resp, next) =>{
    const hotelId = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms : req.params.id}
            })
        } catch (error) {
            next(error)
        }
        resp.status(200).json('Room has been deleted.');
    } catch (error) {
        next(error)
    }
}

export const getRoom = async(req, resp, next) =>{
    try {
        const room = await Room.findById(req.params.id);
        resp.status(200).json(room);
    } catch (error) {
        next(error)
    }
}

export const getRooms = async(req, resp, next) =>{
    try {
        const rooms = await Room.find();
        resp.status(200).json(rooms);
    } catch (error) {
        next(error)
    }
}