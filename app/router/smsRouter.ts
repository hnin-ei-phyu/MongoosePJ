import SMSController from "../controllers/smsController";
import express from "express"
const smsController = new SMSController()
const router = express.Router()

router.post("/create-sms",smsController.create)
router.get("/get-one/:id",smsController.get)
router.put("/update-sms/:id",smsController.update)

export default router 