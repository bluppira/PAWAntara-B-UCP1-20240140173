const express = require('express');
const app = express();
const PORT = 3000;

const products = require('./data/products');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/produk', (req, res) => {
  let filteredProducts = products;

  const { kategori, search } = req.query;

  if (kategori) {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === kategori.toLowerCase()
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.render('produk', { products: filteredProducts });
});

app.get('/produk/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produk = products.find(p => p.id === id);

  if (!produk) {
    return res.status(404).render('produk-not-found');
  }

  res.render('detail-produk', { produk: produk });
});

app.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai');
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});