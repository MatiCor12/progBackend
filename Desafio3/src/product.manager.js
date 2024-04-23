const fs = require('fs').promises

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }
    static lastId = 0

    async addProduct(newObjet) {
    let { title, description, price, thumbnail, code, stock } = newObjet
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("All fields are required", error)
            return
        }
        const codeFound = this.products.find((id) => id.code === code)
        if (codeFound) {
            console.log("The code already exists")
            return
        }

        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)
        await this.saveFilesMio(this.products)
    }

    async getProduct() {
        console.log(this.products)
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readFilesMio()
            const idFound = arrayProducts.find(item => item.id === id)
            if (!idFound) {
                console.log("No product found")
            } else {
                console.log("Product found")
                return idFound
            }
        } catch (error) {
            console.log('Error en lectura de  archivo', error)
        }
    }

    async readFilesMio() {
        try {
            const res = await fs.readFile(this.path, 'utf-8')
            const arrayDeProductos = JSON.parse(res)
            return arrayDeProductos
        } catch (error) {
            console.log("Error when reading file", error)
        }
    }

    async saveFilesMio(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
        } catch (error) {
            console.log("error when saving file", error)
        }
    }

    async upDateProduct(id, productUpdate){
        try {
            const arrayProducts = await this.readFilesMio()

            const index = arrayProducts.findIndex(item => item.id === id)
            if(index !== -1){
                arrayProducts.splice(index, 1, productUpdate)
                await this.saveFilesMio(arrayProducts)
            }else{
                console.log("The product to update was not found")
            }} catch (error) {
            console.log("Error, product could not be updated", error)
        }
    }

    async deleteProduct(id){
        try {
            const arrayProducts = await this.readFilesMio()
            const deleteUpDate = arrayProducts.filter(item => item.id != id)
            await this.saveFilesMio(deleteUpDate)
        } catch (error) {
            console.log("Could not delete the product")
        }
    }
}

module.exports = ProductManager

const manager = new ProductManager('./nuevos_productos.json')

//Pruebas
const product1 = {title: 'Auriculares Gamer', description: 'Mejor auricular', price: 1000, thumbnail: 'image1',code: 'A001', stock: 25}

const product2 = {title: 'Mouse Gamer', description: 'Mejor mouse', price: 1500, thumbnail: 'image2', code: 'B001', stock: 35}

const product3 = {title: 'Monitor Gamer', description: 'Mejor monitor 144hz', price: 2000, thumbnail: 'image3', code: 'C001', stock: 35}

const product4 = {title: 'Teclado Gamer', description: 'Mejor teclado', price: 1700, thumbnail: 'image4', code: 'D001', stock: 35}

async function testSearchById(id){
    const encontrado = await manager.getProductById(id)
    console.log(encontrado)
}

const product5 = {
    id: 1,
    title: 'Auriculares Gamer',
    descripcion: 'Auricular de prueba para actualizar el producto 1',
    price: 1000,
    thumbnail: 'image1',
    code: 'A001',
    stock: 25
}

async function testUpdate(id){
    await manager.upDateProduct(id, product5)
    console.log(product5)
}

async function testDelete(id){
    await manager.deleteProduct(id)
}