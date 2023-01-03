const categoriesDB = require("./categories.mongo");
const categoriesJson = require("../../data/categories/categoriesMap.json");

function loadCategoriesData() {
  categoriesJson.forEach(async (category) => {
    await categoriesDB.updateOne(
      { name: category.name },
      { ...category },
      { upsert: true }
    );
  });
}

async function getCategoriesData() {
  return await categoriesDB.find({}, { _id: 0, __v: 0 });
}

module.exports = {
  loadCategoriesData,
  getCategoriesData,
};
