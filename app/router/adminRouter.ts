import AdminController from "../controllers/adminController"
import express from "express"
const router = express.Router()
const adminController = new AdminController()

router.get("/get-admin/:id",adminController.get)
router.post("/create-admin",adminController.create)
router.delete("/delete-admin",adminController.delete)
router.put("/update-password/:id",adminController.updatePassword)
router.put("/update-info/:id",adminController.update)
router.get("login-admin/:id",adminController.login)

export default router