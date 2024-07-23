import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import 'dotenv/config'

import productRoutes from "./routes/productRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import { dbConnection } from "./config/config.js"

//Nombramos la variable app con la función de expres
const app = express();
//Definimos el puerto
const PORT = process.env.PORT;

//Definimos los middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Conexión a MongoDB
app.use(session({
    store: MongoStore.create({mongoUrl: `${process.env.URL_MONGODB}`,ttl: 1000}),
    secret: process.env.SECRET_SESSION,
    resave : false,
    saveUninitialized:true
}));

//Importar las rutas que serán usadas
app.use('/api/products', productRoutes);

// Manejador de errores
app.use(errorHandler);

await dbConnection()

const expressServer = app.listen(PORT, () => {console.log(`Running application in the port ${PORT}`);});
