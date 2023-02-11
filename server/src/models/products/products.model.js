const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const productsDB = require("./products.mongo");

function loadProductsData() {
  const filesArray = [
    "accessories",
    "bags",
    "beauty",
    "house",
    "jewelry",
    "kids",
    "men",
    "shoes",
    "women",
  ];

  let prodCount = 0;

  filesArray.forEach((fileName) => {
    let count = 0;
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "products", `${fileName}.csv`)
    )
      .pipe(csv({}))
      .on("data", async (data) => {
          if (count < 200 && data.brand !== "" && data.name.length <= 40 && data.variation_0_color !== "" && data.variation_1_color !== "" && data.variation_0_image !== "" && data.variation_1_image !== "") {
            count++;
            await productsDB.updateOne(
              { name: data.name },
              { ...data, quantity: 100, pid : data.name.replace(/ /g, "_").toLowerCase() },
              { upsert: true }
            );
          } else {
            return;
          }
      })
      .on("end", () => {
        console.log(`${fileName} data is uploaded`);
        console.log(count);
      });
  });
}

async function getProductsByCategory(id) {
  let products;
  products = await productsDB.find({category : id});
  if (products.length === 0) {
    products = await productsDB.find({subcategory : id});
  }
  return products
}

async function getProduct(pid) {
  const product = await productsDB.findOne({pid : pid})
  return product;
}

module.exports = {
  loadProductsData,
  getProductsByCategory,
  getProduct
};
