const Order = require('../models/order');
const User = require('../models/user');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { idUtilisateur, listeProduits, statut } = req.body;

        // Validate required fields
        if (!idUtilisateur || !listeProduits || !Array.isArray(listeProduits)) {
            return res.status(400).json({ error: 'idUtilisateur and listeProduits are required' });
        }

        // Calculate total price
        const prixTotal = listeProduits.reduce((total, item) => {
            return total + (item.prix * item.quantite);
        }, 0);

        // Create the new order
        const newOrder = await Order.create({
            idUtilisateur,
            listeProduits,
            statut: statut || 'en cours',
            prixTotal,
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const Orders = await Order.findAll();
        res.status(200).json(Orders);
    } catch (error) {                                                   
        res.status(400).json({ error: error.message });
    }   
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const foundOrder = await Order.findByPk(req.params.id, {
            include: { model: User, attributes: ['id', 'nom', 'email'] }
        });
        if (foundOrder) {
            res.status(200).json(foundOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const [updated] = await Order.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated === 1) {
            const updatedOrder = await Order.findByPk(req.params.id);
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.destroy({
            where: { id: req.params.id }
        });
        if (deleted === 1) {
            res.status(200).json({ message: 'Order supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
