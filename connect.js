import mongoose from "mongoose";

export const connection = (uri)=>{
        return mongoose.connect(uri)
            .then(()=>{
                console.log('connected to the database succesfully')
            })
            .catch(error=>{
                console.log(error)
            })
}
