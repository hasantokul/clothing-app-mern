const http = require('http');
const app = require('./app');
const mongoose = require("mongoose");
const server = http.createServer(app);
require('dotenv').config();

const PORT = 8000;
const MONGO_URL = process.env.MONGO_URL;
const {loadProductsData} = require("./models/products/products.model");
const {loadCategoriesData} = require("./models/categories/categories.model");

//MONGO DB CONNECTION
mongoose.set('strictQuery', false)

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}


// INITIALIZE THE SERVER
async function startServer() {
  await mongoConnect();

  // loading products & categories data to mongo db just for once
  // await loadProductsData(); 
  await loadCategoriesData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();