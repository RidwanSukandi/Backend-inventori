import mongoose from "mongoose";

const product = new mongoose.Schema({
  kodeBarang: {
    type: String,
  },
  namaBarang: {
    type: String,
    required: true,
  },
  jenisBarang: {
    type: String,
    required: true,
  },
  jumlahBarang: {
    type: Number,
    required: true,
  },
  satuan: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", product);

export default Product;
