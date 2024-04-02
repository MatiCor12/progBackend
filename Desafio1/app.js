class ProductManager {
    constructor(){
        this.products = []
        this.nextId = 1
    }

    addProduct(product){
        if(!this.validateProduct(product)) {
            console.log("Error: el producto no es valido")
            return
        }
        if(this.duplicateCode(product.code)){
            console.log("Error: el codigo ya esta en uso")
            return
        }

        product.id = this.nextId ++
        this.products.push(product)
    }

    validateProduct(product){
        return(
            product.title && product.description && product.price && product.thumbnail && product.code && product.stock
        )
    }

    duplicateCode(code){
        return this.products.some((p) => p.code === code)
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const foundProduct = this.products.find((p) => p.id === id)
        if (!foundProduct) {
            console.log("error, Not found")
        return
    }
    return foundProduct
    }
}

const productManager = new ProductManager()


productManager.addProduct({
    title: "Teclado gamer",
    description: "El mejor teclado de todos",
    price: 12,
    thumbnail: 'ruta/imagen1.jnp',
    code: '001',
    stock: 5,
})

productManager.addProduct({
    title: "Mouse gamer",
    description: "El mejor mouse de todos",
    price: 9,
    thumbnail: 'ruta/imagen2.jnp',
    code: '002',
    stock: 10,
})

productManager.addProduct({
    title: "Monitor 144hz",
    description: "El mejor monitor",
    price: 20,
    thumbnail: 'ruta/imagen3.jnp',
    code: '002',
    stock: 4,
})

const testProducts = productManager.getProducts()
console.log(testProducts)
