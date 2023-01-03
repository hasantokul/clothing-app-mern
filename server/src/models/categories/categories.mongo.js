const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
})

const categoriesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subcategories: {
        type: [subcategorySchema]
    }
});

module.exports = mongoose.model("Categories", categoriesSchema);