import ProductManager from "../controllers/productManager.js"
import { __dirname } from "../utils.js"
const pm = new ProductManager(__dirname+'/data/products.json')

const socketProducts = (socketServer) => {
    socketServer.on("connection",async(socket)=>{
        console.log("client connected con ID:",socket.id)
        const listofproducts=await pm.getProductsView()

        socketServer.emit("eshippingofproducts",listofproducts)
        socket.on("addProduct",async(obj)=>{
            await pm.addProduct(obj)
            const listofproducts=await pm.getProductsView()
            socketServer.emit("shippingofproducts",listofproducts)
            })

            socket.on("deleteProduct",async(id)=>{
                await pm.deleteProduct(id)
                const listofproducts=await pm.getProductsView()
                socketServer.emit("shippingofproductss",listofproducts)
                })
    })
}

export default socketProducts;