import Hotel from "../models/modelHotels.js";


export const createHotel = async(req, resp, next) =>{
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        resp.status(201).json(savedHotel);
    } catch (error) {
       next(error)
    }
}

export const updateHotel = async(req, resp, next) =>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set:req.body }, {new : true});
        resp.status(200).json(updateHotel);
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async(req, resp, next) =>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        resp.status(200).json('Hotel Deleted');
    } catch (error) {
        next(error)
    }
}

export const getHotel = async(req, resp, next) =>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        resp.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

export const getHotels = async(req, resp, next) =>{
    const {min, max, ...other} = req.query
    try {
        const hotel = await Hotel.find({...other, cheapestPrice : { $gt : min || 1 , $lt: max || 9999},}).limit(req.query.limit);
        resp.status(200).json(hotel);
    } catch (error) {
        next(error)
    }
}

export const countByCity = async(req, resp, next) =>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city : city})
        }))
        resp.status(200).json(list);
    } catch (error) {
        next(error)
    }
}

export const countByType = async(req, resp, next) =>{
    try {
       
        const hotelCount =await Hotel.countDocuments({type: "hotel"});
        const apartmentCount =await Hotel.countDocuments({type: "apartment"});
        const resortCount =await Hotel.countDocuments({type: "resort"});
        const villaCount =await Hotel.countDocuments({type: "villa"});
        const cabinCount =await Hotel.countDocuments({type: "cabin"});

        resp.status(200).json([
            { type : "hotels", count : hotelCount},
            { type : "apartments", count : apartmentCount},
            { type : "resorts", count : resortCount},
            { type : "villas", count : villaCount},
            { type : "cabins", count : cabinCount},
        ])

    } catch (error) {
        next(error)
    }
}