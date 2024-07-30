import express from 'express'
//import session from 'express-session'
//import MongoStore from 'connect-mongo'
import 'dotenv/config'

import productRoutes from "./routes/productRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js"
//import { dbConnection } from "./config/config.js"

import logger from "./config/logger.js"
import loggerTestRoutes from "./routes/loggerTest.js"
import mongoose from 'mongoose'

//Nombramos la variable app con la función de expres
const app = express();

//Definimos los middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect('process.env.URL_MONGODB')
.then(() => {
    logger.info('MongoDB connected');
}).catch(err => {
    logger.error('MongoDB connection error', err);
});

// Conexión a MongoDB
/*app.use(session({
    store: MongoStore.create({mongoUrl: `${process.env.URL_MONGODB}`,ttl: 1000}),
    secret: process.env.SECRET_SESSION,
    resave : false,
    saveUninitialized:true
})) */

//Importar las rutas que serán usadas
app.use('/api/products', productRoutes);
app.use('/loggerTest', loggerTestRoutes);

// Manejador de errores
app.use(errorHandler);

//await dbConnection()

const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});