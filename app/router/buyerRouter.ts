import Buycontroller from "../controllers/buyerController"
import express from "express"
const router = express.Router()
const buyerController = new Buycontroller()

router.get("/get-buyer/:id",buyerController.get)
router.post("/create-buyer",buyerController.create)
router.get("/get-all",buyerController.getAll)
router.delete("/delete-buyer",buyerController.delete)
router.put("/update-password/:id",buyerController.updatePassword)
router.put("/update-info/:id",buyerController.update)
router.get("/login-buyer",buyerController.login)
router.get("/get-paginate",buyerController.paginate)

export default router