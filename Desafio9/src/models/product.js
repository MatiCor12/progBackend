import { Schema, model } from "mongoose";

const nameCollection = "Product"

const ProductSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    category: String,
    image: String
});

export const productModel = model(nameCollection, ProductSchema);