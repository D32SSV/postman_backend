import Order from "../models/order.mjs";

export const purchaseOrder = async (req, res) => {
  const { products } = req.body;
  try {
    const orderProducts = await Promise.all(
      products.map(async (item) => {
        const product = await findById(item.productId);
        if (!product) throw new Error("Product not found");

        if (product.stock < item.quantity)
          throw new Error("Insufficient stock");

        return { productId: product._id, quantity: item.quantity };
      })
    );

    const totalAmount = orderProducts.reduce((sum, item) => {
      const product = findById(item.productId);
      return sum + product.price * item.quantity;
    }, 0);

    const order = new Order({
      userId: req.user._id,
      products: orderProducts,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const declineOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await findByIdAndUpdate(
      orderId,
      { status: "declined" },
      { new: true }
    );
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
