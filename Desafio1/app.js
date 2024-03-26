class ProductManager {
    constructor(){
        this.products = []
        this.nextId = 1
    }

    addProduct(product){
        if(!this.Valid(product)) {
            console.log("Error: el producto no es valido")
            return
        }
        if(this.Duplicate(product.code)){
            console.log("Error: el codigo ya esta en uso")
            return
        }

        product.id = this.nextId ++
        this.products.push(product)
    }

    Valid(product){
        return(
            product.title && product.description && product.price && product.thumbnail && product.code && product.stock
        )
    }

    Duplicate(code){
        return this.products.some((p) => p.code === code)
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const productoEncontrado = this.products.find((p) => p.id === id)
        if (!productoEncontrado) {
            console.log("error, Not found")
        return
    }
    return productoEncontrado
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

const productos = productManager.getProducts()
console.log(productos)
