import express from 'express';
import CartManager from '../cartManager.mjs'

const router = express.Router();
const cartManager = new CartManager("./Desafio4/src/data/carts.json")

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts()
        res.json(carts)
    } catch (error) {
        console.error('Error getting carts:', error)
        res.status(500).json({ message: 'Server error' })
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    } catch (error) {
        console.error('Error creating cart:', error)
        res.status(500).json({ message: 'Server error' })
    }
})

router.get('/:cartId/products', async (req, res) => {
    const cartId = parseInt(req.params.cartId)
    try {
        const products = await cartManager.getCartProducts(cartId)
        res.json(products)
    } catch (error) {
        console.error('Error getting products from cart:', error)
        res.status(500).json({ message: 'Server error' })
    }
})

router.post('/:cartId/products/:productId', async (req, res) => {
    const cartId = parseInt(req.params.cartId)
    const productId = parseInt(req.params.productId)
    try {
        await cartManager.addProductToCart(cartId, productId)
        res.status(201).json({ message: 'Product added to cart' })
    } catch (error) {
        console.error('Error adding product to cart:', error)
        res.status(500).json({ message: 'Server error' })
    }
});

export default router