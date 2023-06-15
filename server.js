import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  createUser,
  getAllUser,
  updateUser,
  removeUser,
  userById,
} from "./App/controllers/userController.js";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  removeProduct,
} from "./App/controllers/productController.js";
import {
  addNewSuplier,
  getAllSuplier,
  updateSuplier,
  removeSuplier,
} from "./App/controllers/suplierController.js";
import {
  addBarangMasuk,
  getBarangMasuk,
  deleteBarangMasuk,
} from "./App/controllers/addBarangMasuk.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

//route users

app.post("/api/auth/register", createUser);
app.get("/api/user", getAllUser);
app.get("/api/user/:id", userById);
app.put("/api/user/update/:id", updateUser);
app.delete("/api/user/delete/:id", removeUser);

//route Products
app.post("/api/product", createProduct);
app.get("/api/product", getAllProduct);
app.put("/api/product/update/:id", updateProduct);
app.delete("/api/product/delete/:id", removeProduct);

//route Suplier
app.post("/api/suplier", addNewSuplier);
app.get("/api/suplier", getAllSuplier);
app.put("/api/suplier/update/:id", updateSuplier);
app.delete("/api/suplier/delete/:id", removeSuplier);

//route add barang masuk
app.post("/api/barang-masuk", addBarangMasuk);
app.get("/api/barang-masuk", getBarangMasuk);
app.delete("/api/barang-masuk/delete/:id", deleteBarangMasuk);

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

mongoose
  .connect("mongodb://127.0.0.1:27017/inventori")
  .then(() => {
    console.log("koneksi berhasil");
  })
  .catch(() => {
    console.log("koneksi gagal");
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
