const express = require('express');
const categoriesRouter = require('./categories/categories.router');
const paymentRouter = require('./payment/payment.router');
const productsRouter = require('./products/products.router');
const api = express.Router();

api.use("/categories", categoriesRouter);
api.use("/products", productsRouter);
api.use("/", paymentRouter);

module.exports = api;

