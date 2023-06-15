import expres from "express";
import {
  createUser,
  getAllUser,
  updateUser,
  removeUser,
  userById,
} from "../controllers/userController.js";

const router = expres.Router();

router.post("/register", createUser);
router.get("/", getAllUser);
router.get("/:id", userById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", removeUser);

export default router;
