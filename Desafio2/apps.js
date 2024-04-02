import {promises as fs} from "fs"

class ProductManager {
    constructor(){
        this.patch = "./products.txt"
        this.products = []
}

static id = 0

addProduct = async (title, description, price, thumbnail, code, stock) => {

    ProductManager.id++

    let newProduct = {
        id: ProductManager.id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }

    this.products.push(newProduct)
    await fs.writeFile(this.patch, JSON.stringify(this.products))
}

readProducts = async () => {
    let answer = await fs.writeFile(this.patch, "utf-8")
    return JSON.parse(answer)
}
getProducts = async () =>{
    let answer2 = await this.readProducts()
    return console.log(answer2)
}
getProductsById = async (id) => {
    let answer3 = await this.readProducts()
    if(!answer3.find(product => product.id === id)){
        console.log("Product not found")
    } else {
        console.log(answer3.find(product => product.id === id))
    }
}
deleteProductsById = async () => {
    let answer3 = await this.readProducts()
    let productFilter = answer3.filter(products => products.id !=id)
    await fs.writeFile(this.patch, JSON.stringify(productFilter))
    console.log("Product delete")
}

updateProducts = async (id, ...product) => {
    await this.deleteProductsById(id)
    let oldProduct = await this.readProducts()
    let modifiedProduct =  [
        {id, ...product}, ... oldProduct]
        await fs.writeFile(this.patch, JSON.stringify(modifiedProduct))
}
}

const products = new ProductManager
products.addProduct("Titulo1", "Description1", 1000, "imagen1", "abc111", 5)
products.addProduct("Titulo2", "Description2", 500, "imagen2", "abc222", 6)
products.addProduct("Titulo3", "Description3", 250, "imagen3", "abc333", 4)

products.getProductsById()
products.deleteProductsById()
products.updateProducts({
    id: 4,
    title: "Titulo4",
    description: "Descripcion4",
    price: 135,
    thumbnail: "imagen4",
    code: "abc444",
    stock: 4,
})