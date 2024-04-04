const fs = require('fs');

class ProductManager {
    constructor(filePath) {
    this.filePath = "./product.json";
    this.products = [];

    }

    loadProducts() {
    try {
        const data = fs.readFileSync(this.filePath, 'utf8')
        this.products = JSON.parse(data);
        console.log("Products: ", data)
    } catch (error) {
        this.products = []
        console.log("Error loading database", error)
    }
    }
    saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    try {
        fs.writeFileSync(this.filePath, data);
        console.log("Product added")
    } catch (error) {
        console.log("Error when adding product.", error)
    }
    }
    addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios.");
        return;
    }

    const codeEncotrado = this.products.find((id) => id.code === code)
    if (codeEncotrado) {
        console.log('The code already exists')
        return
    }

    const id = this.products.length + 1;
    const product = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };
    this.products.push(product);
    this.saveProducts();
    }
    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        const product = this.products.find(product => product.id === id);
        if(!product){
            console.log("Not found");
            return;
        }
        return product;
    }

    updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveProducts();
        return true;
    }
    return false;
    }

    deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index !== -1) {
        this.products.splice(index,1);
        this.saveProducts();
        return true;
    }
    return false;
    }
}

const manager = new ProductManager();

manager.addProduct("Auriculares Gmer", "Mejor auricular", 1000, "image1", "A002", 10);
manager.addProduct("Mouse Gamer", "Mejor mouse", 1500, "image2", "B001", 7);
manager.addProduct("Monitor Gamer", "Mejor monitor 144hz", 2000, "image3", "C002", 5);
manager.addProduct("Teclado gamer", "Mejor teclado", 1700, "image4", "D001", 7);


console.log(manager.getProducts());

manager.updateProduct(1, { price: 1200 });
console.log(manager.getProducts());

manager.deleteProduct(2);
console.log(manager.getProducts());
