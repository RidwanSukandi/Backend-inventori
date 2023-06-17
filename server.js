import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import RouterUser from "./App/routes/userRoute.js";
import RouteProduct from "./App/routes/productRoute.js";
import RouteSuplier from "./App/routes/suplierRoute.js";
import RouteBarangMasuk from "./App/routes/suplierRoute.js";

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

app.use("/api/user", RouterUser);

//route Products
app.use("/api/product", RouteProduct);

//route Suplier
app.use("/api/suplier", RouteSuplier);

//route add barang masuk
app.use("/api/barang-masuk", RouteBarangMasuk);

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

mongoose
  .connect(
    "mongodb+srv://ridwansukandi17:xPSHfX0YkxLr0JlF@backend-inventori.fqltvhg.mongodb.net/"
  )
  .then(() => {
    console.log("koneksi berhasil");
  })
  .catch(() => {
    console.log("koneksi gagal");
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
