const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));


app.use(express.json({limit: "16KB"}))
app.use(express.urlencoded({extended: true, limit: "16KB"}))
app.use(cookieParser());

const userRouter = require('./routes/user.routes');
const orderRouter = require('./routes/order.routes');
const cartRouter = require('./routes/cart.routes');
const checkoutRouter = require('./routes/checkout.routes');

app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

module.exports = {
    app
};