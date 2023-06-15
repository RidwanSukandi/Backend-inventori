import Suplier from "../models/suplierModels.js";

const addNewSuplier = async (req, res) => {
  const { namaSuplier, alamat, telepon } = req.body;
  const character = "123456789";
  const lenght = character.length;
  let uniqId = "";

  for (let index = 0; index < 7; index++) {
    uniqId += character.charAt(Math.floor(Math.random() * lenght));
  }

  const result = await Suplier.findOne({ namaSuplier: namaSuplier });

  if (!result) {
    const response = await Suplier.create({
      kodeSuplier: `SUP-${uniqId}`,
      namaSuplier,
      alamat,
      telepon,
    });
    res.status(200).json({
      message: "Success",
      statusCode: 200,
      data: {
        response,
      },
    });
  } else {
    res.status(400).json({
      message: "Nama suplier sudah tersedia",
      statusCode: 400,
    });
  }
};

const getAllSuplier = async (req, res) => {
  await Suplier.find()
    .then((response) => {
      res.status(200).json({
        message: "success",
        statusCode: 200,
        data: response,
      });
    })
    .catch(() => {
      res.status(404).json({
        message: "suplier not found",
        statusCode: 404,
      });
    });
};

const updateSuplier = async (req, res) => {
  const id = req.params.id;
  const { kodeSuplier, namaSuplier, alamat, telepon } = req.body;
  Suplier.updateOne(
    { _id: id },
    { kodeSuplier, namaSuplier, alamat, telepon }
  ).then((response) => {
    response.modifiedCount > 0
      ? res.status(200).json({ message: "success", status_code: 200 }).end()
      : res.status(400).json({ message: "failed", status_code: 400 });
  });
};

const removeSuplier = (req, res) => {
  const id = req.params.id;

  Suplier.deleteOne({ _id: id }).then((response) => {
    response.deletedCount > 0
      ? res.status(200).json({ message: "success", status_code: 200 }).end()
      : res.status(400).json({ message: "failed", status_code: 400 });
  });
};

export { addNewSuplier, getAllSuplier, updateSuplier, removeSuplier };
