import express from "express"
import UserController from "../controllers/userController"
const router = express.Router()
const userController = new UserController()

router.get("/get-one-user/:id",userController.get)
router.put("/update-user/:id",userController.update)
router.delete("/delete-user/:id",userController.delete)
router.post("/create-user",userController.create)
router.get("/get-all",userController.getAll)

export default router