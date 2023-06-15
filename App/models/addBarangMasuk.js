import mongoose from "mongoose";

const addBarang = new mongoose.Schema(
  {
    idTransaksi: {
      type: String,
      required: true,
    },
    tanggalMasuk: {
      type: Date,
      required: true,
    },
    kodeBarang: {
      type: String,
      required: true,
    },
    namaBarang: {
      type: String,
      required: true,
    },
    pengirim: {
      type: String,
      required: true,
    },
    jumlahMasuk: {
      type: Number,
      required: true,
    },
    satuan: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AddBarang = mongoose.model("BarangMasuk", addBarang);

export default AddBarang;
