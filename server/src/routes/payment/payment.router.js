const express = require("express");
const { httpCreateCheckoutSession } = require("./payment.controller");
const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", httpCreateCheckoutSession);




module.exports = paymentRouter;