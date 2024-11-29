const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db.js');
const Product = require('./models/Products.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
connectDB();

// Rota para obter todos os produtos
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para adicionar um produto
app.post('/products', async (req, res) => {
  const { name, price, category, image_url, description } = req.body;
  try {
    const newProduct = new Product({ name, price, category, image_url, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar um produto pelo ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
