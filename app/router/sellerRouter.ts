import SellerController from "../controllers/sellerController"
import express from "express"
const router = express.Router()
const sellerController = new SellerController()

router.get("/get-seller/:id",sellerController.get)
router.post("/create-seller",sellerController.create)
router.get("/get-all",sellerController.getAll)
router.delete("/delete-seller/:id",sellerController.delete)
router.put("/update-password/:id",sellerController.updatePassword)
router.put("/update-info/:id",sellerController.update)
router.get("/login-seller",sellerController.login)
router.get("/get-paginate",sellerController.paginate)

export default router