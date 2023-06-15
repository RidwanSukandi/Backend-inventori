import addBarang from "../models/addBarangMasuk.js";
import Product from "../models/productModels.js";

export const addBarangMasuk = async (req, res) => {
  try {
    const {
      tanggalMasuk,
      kodeBarang,
      namaBarang,
      pengirim,
      jumlahMasuk,
      satuan,
    } = req.body;

    const character = "123456789";
    const length = character.length;
    let uniqId = "";

    for (let index = 0; index < 7; index++) {
      uniqId += character.charAt(Math.floor(Math.random() * length));
    }

    const response = await addBarang.create({
      idTransaksi: `TRM-${uniqId}`,
      tanggalMasuk,
      kodeBarang,
      namaBarang,
      pengirim,
      jumlahMasuk,
      satuan,
    });

    const result = await Product.findOne({ namaBarang: namaBarang });
    await Product.updateOne(
      { namaBarang: namaBarang },
      { jumlahBarang: result.jumlahBarang - response.jumlahMasuk }
    );

    if (response) {
      res.status(200).json({
        message: "success",
        statusCode: 200,
      });
    } else {
      res.status(400).json({
        message: "failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan dalam pengeluaran barang.",
    });
  }
};

export const getBarangMasuk = async (req, res) => {
  addBarang.find().then((response) => {
    res
      .status(200)
      .json({ statusCode: 200, mesaage: "success", data: response });
  });
};

export const deleteBarangMasuk = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await addBarang.findOne({ _id: id });
    const result = await Product.findOne({ namaBarang: response.namaBarang });

    await Product.updateOne(
      { namaBarang: response.namaBarang },
      { jumlahBarang: result.jumlahBarang - response.jumlahMasuk }
    );

    await addBarang.deleteOne({ _id: id });

    res.status(200).json({ statusCode: 200, message: "success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
};
