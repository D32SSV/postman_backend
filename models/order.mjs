import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "completed", "declined"],
    default: "pending",
  },
});

export default model("Order", orderSchema);
