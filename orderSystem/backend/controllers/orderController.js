const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {

    try {

        const { name, phone, address, payment_method, cart } = req.body;

        let totalAmount = 0;

        for (let item of cart) {

            const product = await Product.findById(item.product_id);

            totalAmount += product.price * item.quantity;
        }

        const order = new Order({
            user_name: name,
            phone,
            address,
            payment_method,
            total_amount: totalAmount,
            payment_status: payment_method === "COD" ? "Pending" : "Pending"
        });

        await order.save();

        for (let item of cart) {

            const product = await Product.findById(item.product_id);

            const orderItem = new OrderItem({
                order_id: order._id,
                product_id: product._id,
                quantity: item.quantity,
                price: product.price
            });

            await orderItem.save();
        }

        res.json({
            message: "Order Created",
            orderId: order._id,
            totalAmount
        });

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};