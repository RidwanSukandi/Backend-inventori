import mongoose from "mongoose";

const suplier = new mongoose.Schema(
  {
    kodeSuplier: {
      type: String,
      required: true,
    },
    namaSuplier: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    telepon: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Suplier = mongoose.model("suplier", suplier);

export default Suplier;
