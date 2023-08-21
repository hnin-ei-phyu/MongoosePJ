import ContactController from "../controllers/contactController";
import express from "express"
const router = express.Router()
const contactController = new ContactController()

router.post("/create-contact",contactController.create)
router.put("/update-contact",contactController.update)
router.delete("/delete-contact/:id",contactController.delete)

export default router