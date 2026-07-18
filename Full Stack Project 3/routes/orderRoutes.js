const express = require("express");

const router = express.Router();

const order = require("../controllers/orderController");

router.get("/", order.getOrders);

router.post("/", order.createOrder);

router.put("/:id", order.updateOrder);

router.delete("/:id", order.deleteOrder);

module.exports = router;
