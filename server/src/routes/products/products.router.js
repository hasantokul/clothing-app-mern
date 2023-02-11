const express = require("express");
const { httpGetProductsByCategory, httpGetProduct } = require("./products.controller");
const productsRouter = express.Router();

productsRouter.get("/:category", httpGetProductsByCategory);
productsRouter.get("/product/:pid", httpGetProduct);

module.exports = productsRouter;