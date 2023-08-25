import NotificationController from "../controllers/notificatoinController"
import express from "express"
const router = express.Router()
const notificationController = new NotificationController()

router.post("/create-noti",notificationController.create)
router.get("/get-one/:id",notificationController.get)
router.post("/getNoti-withLimit",notificationController.getNotiWithLimit)
router.delete("/delete-noti/:id",notificationController.delete)

export default router 
