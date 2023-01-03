const express = require("express");
const { httpGetCategories } = require("./categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.get("/", httpGetCategories);

module.exports = categoriesRouter;