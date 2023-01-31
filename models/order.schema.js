import mongoose, { model } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                        required: true
                    },
                    count: Number,
                    price: Number
                }
            ],
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELED"],
            default: "ORDERED"
            //can we improve this ?
        },
        // paymentMode: Uint8ClampedArray, creditcard, wallet, COD
    },
    {
        timestamps: true
    }
)

export default model.mongoose("Order", orderSchema)