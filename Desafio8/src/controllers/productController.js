import { productModel } from "../models/product.js"
import { CustomError, errorDictionary } from "../utils/customError.js"
import { generateMockData } from "../utils/mockData.js";


export const getMockProducts = async (req, res, next) => {
    try {
        const mockProducts = generateMockData();
        res.status(200).json(mockProducts);
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { title, price, description, category } = req.body;

        if (!title) throw new CustomError(errorDictionary.MISSING_TITLE, 400);
        if (!price) throw new CustomError(errorDictionary.MISSING_PRICE, 400);
        if (!description) throw new CustomError(errorDictionary.MISSING_DESCRIPTION, 400);
        if (!category) throw new CustomError(errorDictionary.MISSING_CATEGORY, 400);

        const newProduct = new productModel(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};
