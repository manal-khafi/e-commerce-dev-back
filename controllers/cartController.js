const Cart = require('../models/cart');
const User = require('../models/user');

// Create a new cart
exports.createCart = async (req, res) => {
    try {
        const { idUtilisateur, produits } = req.body;

        // Validate input
        if (!idUtilisateur) {
            return res.status(400).json({ error: 'idUtilisateur is required' });
        }

        // Calculate total price
        const prixTotal = produits.reduce((total, item) => {
            return total + (item.prix * item.quantite);
        }, 0);

        // Create new cart
        const cart = await Cart.create({
            idUtilisateur,
            produits: produits || [],
            prixTotal
        });

        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all carts
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll({
            include: { model: User, attributes: ['id', 'nom', 'email'] }
        });
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a cart by ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id, {
            include: { model: User, attributes: ['id', 'nom', 'email'] }
        });
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add product to cart
exports.addProductToCart = async (req, res) => {
    try {
        const { id } = req.params; // cart ID
        const { produit } = req.body; // { idProduit, nom, prix, quantite }

        const cart = await Cart.findByPk(id);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const produits = cart.produits || [];

        // Check if product already exists
        const existingProduct = produits.find(p => p.idProduit === produit.idProduit);
        if (existingProduct) {
            existingProduct.quantite += produit.quantite;
        } else {
            produits.push(produit);
        }

        // Update total
        const prixTotal = produits.reduce((total, item) => total + (item.prix * item.quantite), 0);

        await cart.update({ produits, prixTotal });

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove product from cart
exports.removeProductFromCart = async (req, res) => {
    try {
        const { id, idProduit } = req.params;

        const cart = await Cart.findByPk(id);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const produits = cart.produits.filter(p => p.idProduit != idProduit);

        // Recalculate total
        const prixTotal = produits.reduce((total, item) => total + (item.prix * item.quantite), 0);

        await cart.update({ produits, prixTotal });

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a cart (general)
exports.updateCart = async (req, res) => {
    try {
        const [updated] = await Cart.update(req.body, {
            where: { id: req.params.id }
        });

        if (updated === 1) {
            const updatedCart = await Cart.findByPk(req.params.id);
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
    try {
        const deleted = await Cart.destroy({
            where: { id: req.params.id }
        });

        if (deleted === 1) {
            res.status(200).json({ message: 'Cart supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
