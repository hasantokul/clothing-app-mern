const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const api = require("./routes/router");

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use("/", api);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;