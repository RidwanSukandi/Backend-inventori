import express from "express";

const router = express.Router();

router.post("/", addBarangMasuk);
router.get("/", getBarangMasuk);
router.delete("/delete/:id", deleteBarangMasuk);

export default router;
