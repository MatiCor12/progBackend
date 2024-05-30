import { request, response} from 'express'
import { getProductsModerate } from '../moderate/products.js'
import { getCartByIdModerate } from '../moderate/carts.js'
import { getUser, registerUser } from '../moderate/user.js'

export const homeView = async (req = request, res = response) => {
    const limit = 10
    const {payload} = await getProductsModerate({limit})
    const user =  req.session.user
    return res.render('home', { productos: payload, title: 'Home', user})
}

export const realTimeProductsView = async (req = request, res = response) => {
    return res.render('realTimeProducts', {title: 'Real time'})
}

export const productsView = async (req = request, res = response) => {
    const result = await getProductsModerate({...req.query})
    return res.render('products', {title:'productos', result})
}

export const cartIdView = async (req = request, res = response) => {
    const {cid} = req.params
    const carrito = await getCartByIdModerate(cid);
    const user =  req.session.user
    return res.render('cart', {title: 'carrito', carrito, user})
}

export const loginView= async (req = request, res = response) => {
    return res.render('login', {title: 'Login'})
}

export const loginSend= async (req = request, res = response) => {
    const { email, password } = req.body

    const user = await getUser(email)

    if(user && user.password === password){
        const userName = `${user.name} ${user.lastName}`
        req.session.user = userName
        req.session.rol = user.rol
        return res.redirect('/')
    }

    return res.redirect('/login')
}

export const registerView = async (req = request, res = response) => {
    return res.render('register', {title: 'Register'})
}

export const registerSend= async (req = request, res = response) => {
    const { password, confirmPassword } = req.body

    if(password !== confirmPassword)
        return res.redirect('/register')

    const user = await registerUser({...req.body})

    if(user){
        const userName = `${user.name} ${user.lastName}`
        req.session.user = userName
        req.session.rol = user.rol
        return res.redirect('/')
    }

    return res.redirect('/register')
}

export const logout = async (req = request, res = response) => {
    req.session.destroy((err)=> {
        if (err) return res.status(500).send('Error when closing session')
        res.redirect('/login')
    })
}