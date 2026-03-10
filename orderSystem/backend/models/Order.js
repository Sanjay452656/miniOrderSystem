const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user_name: String,

    phone: String,

    address: String,

    total_amount: Number,

    payment_method: {
        type: String,
        enum: ["COD", "Online"]
    },

    payment_status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending"
    },

    order_status: {
        type: String,
        default: "Confirmed"
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);