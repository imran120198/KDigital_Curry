const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  material: { type: String },
  grades: { type: String },
  price: { type: Number },
  productType: { type: String },
  product_details: {
    shape: { type: String, default: "" },
    thickness: { type: String, default: "" },
    surfaceFinished: { type: String, default: "" },
    length: { type: String, default: "" },
    outsideDiameter: { type: String, default: "" },
  },
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = {
  ProductModel,
};
