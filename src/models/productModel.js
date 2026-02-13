import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        default: "general"
    }
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
