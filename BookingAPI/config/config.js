import mongoose from "mongoose";

const connect = async (DATABASE_URL) =>{

    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Database connected.")
    } catch (error) {
       throw error;
    }
}


export default connect;