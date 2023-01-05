const express = require("express");
const { httpGetProductsByCategory } = require("./products.controller");
const productsRouter = express.Router();

productsRouter.get("/:category", httpGetProductsByCategory);

module.exports = productsRouter;