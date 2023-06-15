import express from "express";
import {
  addNewSuplier,
  getAllSuplier,
  updateSuplier,
  removeSuplier,
} from "../controllers/suplierController.js";

const router = express.Router();

router.post("/", addNewSuplier);
router.get("/", getAllSuplier);
router.put("/update/:id", updateSuplier);
router.delete("/delete/:id", removeSuplier);

export default router;
