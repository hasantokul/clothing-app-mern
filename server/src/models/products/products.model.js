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

  filesArray.forEach((fileName) => {
    let count = 0;
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "products", `${fileName}.csv`)
    )
      .pipe(csv({}))
      .on("data", async (data) => {
          if (count < 200 && data.brand !== "" && data.name.length <= 40 && data.variation_0_color !== "" && data.variation_0_color !== "") {
            count++;
            await productsDB.updateOne(
              { name: data.name },
              { ...data, quantity: 100 },
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

module.exports = {
  loadProductsData,
  getProductsByCategory
};
