import express from "express"
import SpecificationController from "../controllers/specificatoinController"
const router = express.Router()
const specificationController = new SpecificationController()

router.post("/create-specification",specificationController.create)
router.get("/get-one/:id",specificationController.get)
router.get("/get-all",specificationController.getAll)

export default router