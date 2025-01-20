import Product from "../models/product.mjs";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const addProduct = async (req, res) => {
  console.log("HIT addProduct Hit");

  const { name, price, description, stock } = req.body;
  try {
    const newProduct = new Product({ name, price, description, stock });
    await newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;
  try {
    const product = await findByIdAndUpdate(
      id,
      { name, price, description, stock },
      { new: true }
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const apiKey = req.user;
  console.log("MIDDLEWARE>>>>", apiKey);

  if (apiKey) {
    return res.status(500).json({
      success: false,
      message:
        "Not authorised for this operation, Sccessfully Tested Auth Middleware through API_KEY",
    });
  }
  const { id } = req.params;
  try {
    const product = await findByIdAndDelete(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
