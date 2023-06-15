import mongoose from "mongoose";

const user = new mongoose.Schema({
  nik: {
    type: Number,
    required: true,
  },
  nama: {
    type: String,
    required: true,
    trim: true,
  },
  telepon: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", user);

export default User;
