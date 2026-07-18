const db = require("../config/db");

// GET All Orders
exports.getOrders = (req, res) => {
    db.query("SELECT * FROM orders", (err, results) => {
        if (err)
            return res.status(500).json({ success: false, message: err.message });

        res.status(200).json({
            success: true,
            data: results
        });
    });
};

// CREATE Order
exports.createOrder = (req, res) => {

    const { customer_name, email, product_id, quantity, total_price } = req.body;

    if (!customer_name || !email || !product_id || !quantity || !total_price) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    db.query(
        "INSERT INTO orders(customer_name,email,product_id,quantity,total_price) VALUES(?,?,?,?,?)",
        [customer_name, email, product_id, quantity, total_price],
        (err) => {

            if (err)
                return res.status(500).json({ success: false, message: err.message });

            res.status(201).json({
                success: true,
                message: "Order Placed Successfully"
            });

        });
};

// UPDATE Order
exports.updateOrder = (req, res) => {

    const id = req.params.id;

    const { quantity, status } = req.body;

    db.query(
        "UPDATE orders SET quantity=?, status=? WHERE id=?",
        [quantity, status, id],
        (err) => {

            if (err)
                return res.status(500).json({ success: false, message: err.message });

            res.json({
                success: true,
                message: "Order Updated"
            });

        });

};

// DELETE Order
exports.deleteOrder = (req, res) => {

    db.query(
        "DELETE FROM orders WHERE id=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json({ success: false, message: err.message });

            res.json({
                success: true,
                message: "Order Deleted"
            });

        });

};