import MerchandiseController from "../controllers/merchandiseController"
import express from "express"
const router = express.Router()
const merchandiseController = new MerchandiseController()

router.post("/create-merchandise",merchandiseController.create)
router.get("/get-all",merchandiseController.getAll)
router.get("/get-one/:id",merchandiseController.get)
router.put("/update-merchandise",merchandiseController.update)
router.delete("/delete-merchandise",merchandiseController.delete)

export default router