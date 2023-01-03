const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const products = require("./products.mongo");

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
      path.join(__dirname, "..", "..", "data", `${fileName}.csv`)
    )
      .pipe(csv({}))
      .on("data", async (data) => {
        count++;
        if (count <= 100) {
          await products.updateOne(
            { name: data.name },
            { ...data },
            { upsert: true }
          );
        } else {
          return;
        }
      })
      .on("end", () => {
        console.log(`${fileName} data is uploaded`);
      });
  });
}

module.exports = {
  loadProductsData,
};
