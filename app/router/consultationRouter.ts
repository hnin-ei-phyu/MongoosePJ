import ConsultationController from "../controllers/consultationController";
import express from "express"
const router = express.Router()
const consultationController = new ConsultationController()

router.get("/get-consultation/:id",consultationController.get)
router.post("/create-consultation",consultationController.create)
router.get("/get-all",consultationController.getAll)
router.delete("/delete-consultation/:id",consultationController.delete)
router.get("/get-paginate",consultationController.paginate)

export default router