import { ProductDao } from "../dao/index.js"

export const getProducts = async ({ limit = 2, page = 1, sort, query}) => await ProductDao.getProducts()

export const getProductById = async (pid) => await ProductDao.getProductById()

export const getProductByCode = async (code) => await ProductDao.getProductByCode()

export const addProduct = async (body) => await ProductDao.addProduct()

export const updateProduct = async (pid, rest) => await ProductDao.updateProduct()

export const deleteProduct = async (pid) => await ProductDao.deleteProduct()

