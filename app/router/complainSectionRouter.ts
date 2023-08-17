import ComplainSectionController from "../controllers/complainSectionController";
import express from "express"
const router = express.Router()
const complainSectionController = new ComplainSectionController()

router.get("/get-complainSection/:id",complainSectionController.get)
router.post("/create-complainSection",complainSectionController.create)
router.get("/get-all",complainSectionController.getAll)
router.put("/update-complainSection/:id",complainSectionController.update)
router.delete("/delete-complainSection/:id",complainSectionController.delete)
router.get("/get-paginate",complainSectionController.paginate)

export default router 