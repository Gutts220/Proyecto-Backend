import mongoose from 'mongoose';

const collectionName = 'products'
 
const productScheme = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    code:{
        type: Number,
        required: true,
        unique: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ["F","M"]    
    },
    category:{
        type: Number,
        required: true,
    },


})

const productModel = mongoose.model(collectionName, productScheme)

export {productModel}