const { Router } = require("express");
const { ProductModel } = require("../Models/Product.model");

const ProductRouter = Router();

ProductRouter.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 30;
    const skip = (page - 1) * limit;
    const data = await ProductModel.find().skip(skip).limit(limit);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

ProductRouter.post("/addProduct", async (req, res) => {
  try {
    const product = new ProductModel({ ...req.body });
    const saveProduct = await product.save();
    res.send({ message: "New Product Added", product: req.body });
  } catch (error) {
    res.send(error);
  }
});

ProductRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const update = await ProductModel.findByIdAndUpdate(id, data);
    res.send({ message: "Update Product Successfully", update });
  } catch (error) {
    res.send(error);
  }
});

module.exports = {
  ProductRouter,
};
