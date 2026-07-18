const db = require("../config/db");

// GET All Products
exports.getProducts = (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};

// GET Single Product
exports.getProductById = (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM products WHERE id = ?",
        [id],
        (err, results) => {

            if (err)
                return res.status(500).json({ success: false, message: err.message });

            if (results.length === 0)
                return res.status(404).json({ success: false, message: "Product Not Found" });

            res.json({
                success: true,
                data: results[0]
            });

        });

};

// CREATE Product
exports.createProduct = (req, res) => {

    const { name, category, description, price, stock, image } = req.body;

    db.query(

        "INSERT INTO products(name,category,description,price,stock,image) VALUES(?,?,?,?,?,?)",

        [name, category, description, price, stock, image],

        (err, result) => {

            if (err)
                return res.status(500).json({ success: false, message: err.message });

            res.status(201).json({
                success: true,
                message: "Product Added Successfully"
            });

        });

};

// UPDATE Product
exports.updateProduct = (req, res) => {

    const id = req.params.id;

    const { name, category, description, price, stock, image } = req.body;

    db.query(

        "UPDATE products SET name=?,category=?,description=?,price=?,stock=?,image=? WHERE id=?",

        [name, category, description, price, stock, image, id],

        (err) => {

            if (err)
                return res.status(500).json({ success: false, message: err.message });

            res.json({
                success: true,
                message: "Product Updated"
            });

        });

};

// DELETE Product

exports.deleteProduct = (req, res) => {

    db.query(

        "DELETE FROM products WHERE id=?",

        [req.params.id],

        (err) => {

            if (err)
                return res.status(500).json({ success: false, message: err.message });

            res.json({
                success: true,
                message: "Product Deleted"
            });

        });

};