import ShopController from "../controllers/shopController";
import express from "express"
const router = express.Router()
const shopController = new ShopController()

router.post("/create-shop",shopController.create)
router.get("/get-one/:id",shopController.get)
router.put("/update-shop/:id",shopController.update)
router.delete("/delete-shop/:id",shopController.delete)

export default router