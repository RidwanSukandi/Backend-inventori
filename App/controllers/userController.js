import User from "../models/userModels.js";

const createUser = async (req, res) => {
  const { nama, telepon, username, level } = req.body;

  const character = "123456789";
  const lenght = character.length;
  let uniqId = "";

  for (let i = 0; i < 7; i++) {
    uniqId += character.charAt(Math.floor(Math.random() * lenght));
  }

  User.findOne({ nama: nama }).then((result) => {
    result == null
      ? User.create({
          nik: uniqId,
          nama,
          telepon,
          username,
          level,
        })
          .then((response) => {
            res.status(200).json({
              message: "succes",
              status_code: 200,
              data: [
                {
                  nik: response.nik,
                  nama: response.nama,
                  username: response.username,
                  telepon: response.telepon,
                  level: response.level,
                },
              ],
            });
          })
          .catch((response) => {
            console.log(response);
          })
      : res
          .status(400)
          .json({ message: "nama sudah terdaftar", status_code: 400 })
          .end();
  });
};

const getAllUser = async (req, res) => {
  User.find()
    .then((response) => {
      if (response.length < 1) {
        res.status(400).json({ message: "data not found", status_code: 404 });
      } else {
        res.status(200).json({
          message: "succes",
          status_code: 200,
          data: response,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "failed", status_code: 400 });
      console.log(err);
    });
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const { nik, nama, telepon, username, level } = req.body;

  User.updateOne(
    { _id: id },
    { $set: { nik, nama, telepon, username, level } }
  ).then((response) => {
    console.log(response);
    response.modifiedCount > 0
      ? res.status(200).json({ message: "success", status_code: 200 }).end()
      : res.status(400).json({ message: "failed", status_code: 400 });
  });
};

const removeUser = (req, res) => {
  const id = req.params.id;

  User.deleteOne({ _id: id }).then((response) => {
    response.deletedCount > 0
      ? res.status(200).json({ message: "success", status_code: 200 }).end()
      : res.status(400).json({ message: "failed", status_code: 400 });
  });
};

const userById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({
    _id: id,
  });

  res.status(200).json({
    message: "success",
    statusCode: 200,
    data: {
      nik: user.nik,
      nama: user.nama,
      telepon: user.telepon,
      username: user.username,
      level: user.level,
    },
  });
};

export { getAllUser, createUser, updateUser, removeUser, userById };
