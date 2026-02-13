import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import sessionsRouter from './routes/sessionsRouter.js';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import passport from 'passport';
import initializePassport from './config/passport.js';
import { env } from './config/env.js';

const app = express();

// Iniciamos la conexión con MongoDB
mongoose.connect(env.MONGO_URI);

// Middlewares incorporados de Express
app.use(express.json()); // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({extended: true})); // Formatea query params de URLs para peticiones entrantes.

initializePassport();
app.use(passport.initialize());

app.use('/api/users', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = Number(env.PORT);
app.listen(PORT, () => {
    console.log(`Start Server in Port ${PORT}`);
});
