require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

async function httpCreateCheckoutSession(req, res) {
    try {
       const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items : req.body.items.map(item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.current_price) * 100
                },
                quantity: item.cartQuantity
            }
        }),
        success_url : `${process.env.SERVER_URL}`,
        cancel_url : `${process.env.SERVER_URL}/error`
       });
       res.json({url:  session.url})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {httpCreateCheckoutSession}