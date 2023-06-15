import expres from "express";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  removeProduct,
} from "../controllers/productController.js";

const router = expres.Router();

router.post("/", createProduct);
router.get("/", getAllProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", removeProduct);

export default router;
