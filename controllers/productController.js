const product = require('../models/product');

// Create a new product
exports.createProduct = async (req, res) => {
    try{
        const product = await product.create(req.body);
        res.status(201).json(product);  
    }catch (error) {
        res.status(400).json({ error: error.message});
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await product.findAll();
        res.status(200).json(products);
    }catch (error) {
        res.status(400).json({ error: error.message});
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product 
exports.updateProduct = async (req, res) => {
    try {
        const [updated] = await product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 1) {
            const updatedProduct = await product.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await product.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 1) { 
            res.status(204).json({ message: 'Produit supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};