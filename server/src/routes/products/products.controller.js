const { getProductsByCategory, getProduct } = require("../../models/products/products.model")


async function httpGetProductsByCategory(req, res) {
    const id = req.params.category;
    return res.json(await getProductsByCategory(id));
}

async function httpGetProduct(req, res) {
    const pid = req.params.pid
    return res.json(await getProduct(pid));
}

module.exports = {httpGetProductsByCategory, httpGetProduct}