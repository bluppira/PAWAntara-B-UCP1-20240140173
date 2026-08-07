const express = require('express');

const products = require('./data/products');

console.log(products);

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});