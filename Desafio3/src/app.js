const express = require('express')
const ProductManager = require('./product.manager.js')
const manager = new ProductManager('./product.json')

const app = express()

const PORT = 8080
app.use(express.urlencoded({ extended: true }))

app.get('/products', async(req, res)=>{
    try {
        const arrayProducts = await manager.readFilesMio()
        let limit = parseInt(req.query.limit)
        if(limit){
            const arraylimit = arrayProducts.slice(0, limit)
            return res.send(arraylimit)
        }else{
            return res.send(arrayProducts)
        }
    } catch (error) {
        console.log(error)
        return res.send("Error processing order")
    }
})

app.get('/products/:pid', async(req, res) =>{
    try {
        let pid = parseInt(req.params.pid)
        const sought = await manager.getProductById(pid)
        if(pid){
            return res.send(sought)
        }else{
            console.log("Product not found")
        }
    } catch (error) {
        console.log(error)
        return res.send("Error processing order by id")
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
