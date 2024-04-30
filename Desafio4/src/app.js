import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"

import productRoutes from "./routes/productRoutes.js"
import viewsRoutes from "./routes/viewsRoutes.js"
import socketProducts from "./listener/socketProducts.js"

//Nombramos la variable app con la función de expres
const app = express()
//Definimos el puerto
const PORT=8080

//Definimos los middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Uso de handlebars
app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")

//Static
app.use(express.static(__dirname + "/public"))

//Importar las rutas que serán usadas
app.use("/api",productRoutes)
app.use('/', viewsRoutes)

//Escuchar los cambios del servidor y socket

const httpServer=app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`)
        console.log(`\t1). http://localhost:${PORT}/api/products`)
    }
    catch (err) {
        console.log(err)
    }
})

const socketServer = new Server(httpServer)

socketProducts(socketServer)