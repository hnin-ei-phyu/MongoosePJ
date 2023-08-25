import PrivacyController from "../controllers/privacyController";
import express from "express"
const router = express.Router()
const privacyController = new PrivacyController()

router.post("/create-privacy",privacyController.create)
router.get("/get-all",privacyController.getALL)
router.get("/get-one/:id",privacyController.get)
router.put("/update-privacy/:id",privacyController.update)
router.delete("/delete-privacy/:id",privacyController.delete)

export default router