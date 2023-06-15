import Product from "../models/productModels.js";

// const createProduct = async (req, res) => {
//   const { namaBarang, jenisBarang, jumlahBarang, satuan } = req.body;
//   const character = "123456789";
//   const lenght = character.length;
//   let uniqId = "";

//   for (let index = 0; index < 7; index++) {
//     uniqId += character.charAt(Math.floor(Math.random() * lenght));
//   }

//   Product.findOne({ namaBarang: namaBarang })
//     .then((result) => {
//       result == null
//         ? Product.create({
//             kodeBarang: `BAR-${uniqId}`,
//             namaBarang,
//             jenisBarang,
//             jumlahBarang,
//             satuan,
//           })
//             .then((response) => {
//               response.map((items) => {
//                 res.status(200).json({
//                   message: "success",
//                   statusCode: 200,
//                   data: [
//                     {
//                       kodeBarang: items.kodeBarang,
//                       namaBarang: items.namaBarang,
//                       jenisBarang: items.jenisBarang,
//                       jumlahBarang: items.jumlahBarang,
//                       satuan: items.satuan,
//                     },
//                   ],
//                 });
//               });
//             })
//             .catch(() => {
//               res.status(401).json({
//                 message: "failed",
//                 statusCode: 401,
//                 data: [null],
//               });
//             })
//         : res.status(400).json({
//             message: "product is already",
//             statusCode: 400,
//           });
//     })
//     .catch((result) => {
//       console.log(result);
//     });
// };

const createProduct = async (req, res, next) => {
  const { namaBarang, jenisBarang, jumlahBarang, satuan } = req.body;
  const character = "123456789";
  const lenght = character.length;
  let uniqId = "";

  for (let index = 0; index < 7; index++) {
    uniqId += character.charAt(Math.floor(Math.random() * lenght));
  }

  try {
    const result = await Product.findOne({ namaBarang: namaBarang });

    if (!result) {
      const response = await Product.create({
        kodeBarang: `BAR-${uniqId}`,
        namaBarang,
        jenisBarang,
        jumlahBarang,
        satuan,
      });
      res.status(200).json({
        message: "success",
        statusCode: 200,
        data: {
          response,
        },
      });
    } else {
      res.status(400).json({
        message: "nama barang sudah tersedia",
        statusCode: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getAllProduct = async (req, res) => {
  await Product.find()
    .then((response) => {
      res.status(200).json({
        message: "success",
        statusCode: 200,
        data: response,
      });
    })
    .catch(() => {
      res.status(404).json({
        message: "product not found",
        statusCode: 404,
      });
    });
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { kodeBarang, namaBarang, jenisBarang, jumlahBarang, satuan } =
    req.body;
  Product.updateOne(
    { _id: id },
    { kodeBarang, namaBarang, jenisBarang, jumlahBarang, satuan }
  ).then((response) => {
    console.log(response);
    response.modifiedCount > 0
      ? res.status(200).json({ message: "success", status_code: 200 }).end()
      : res.status(400).json({ message: "failed", status_code: 400 });
  });
};

const removeProduct = (req, res) => {
  const id = req.params.id;

  Product.deleteOne({ _id: id }).then((response) => {
    response.deletedCount > 0
      ? res.status(200).json({ message: "success", status_code: 200 }).end()
      : res.status(400).json({ message: "failed", status_code: 400 });
  });
};

export { createProduct, getAllProduct, updateProduct, removeProduct };
