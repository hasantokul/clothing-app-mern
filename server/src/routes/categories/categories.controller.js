const {getCategoriesData} = require("../../models/categories/categories.model");

async function httpGetCategories (req, res) {
    return res.status(200).json(await getCategoriesData());
}

module.exports = {
    httpGetCategories
}