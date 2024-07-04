import { CartDao } from "../dao/index.js"

export const getCartById = async() => await CartDao.getCartById()

export const createCart = async() => await CartDao.createCart()

export const addProductInCart = async() => await CartDao.addProductInCart()

export const deleteProductsInCart = async() => await CartDao.deleteProductsInCart()

export const updateProductsInCart = async() => await CartDao.updateProductsInCart()

export const deleteCartModerate = async() => await CartDao.deleteCartModerate()