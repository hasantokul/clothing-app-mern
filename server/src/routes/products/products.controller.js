const { getProductsByCategory } = require("../../models/products/products.model")


async function httpGetProductsByCategory(req, res) {
    const id = req.params.category;
    return res.json(await getProductsByCategory(id));
}

module.exports = {httpGetProductsByCategory}