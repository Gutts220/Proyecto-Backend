import mongoose from "mongoose";

const DB_HOST = 'localhost';
const DB_NAME = 'ecommerceCafeLuziDb';
const DB_PORT = 27017

const configConnection = {
    
    url:  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}

const mongoDBconnection = async() =>{
    try{
        await mongoose.connect(configConnection.url, configConnection.options)
        console.log(`======================================`)
        console.log(`======== URL : ${configConnection.url.substring(0,20)} =======`)
        console.log(`======================================`)
    } catch (error){
       console.log("file: mongoConfig.js:24 ~ mongoDBconnection ~ error:", error)
       throw new Error(error);
    }
}

export {
    configConnection,
    mongoDBconnection,
}