const Order = require("../models/Order");

exports.processPayment = async (req, res) => {

    try {

        const { orderId, success } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.payment_status = success ? "Success" : "Failed";

        await order.save();

        res.json({
            message: success ? "Payment Successful" : "Payment Failed"
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};