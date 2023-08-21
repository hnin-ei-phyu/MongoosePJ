import NewsController from "../controllers/newsController"
import express from "express"
const router = express.Router()
const newsController = new NewsController()

router.post("/create-news",newsController.create)
router.get("/get-news/:id",newsController.get)
router.get("/get-all",newsController.getAll)
router.put("/update-news/:id",newsController.upadate)
router.delete("/delete-news/:id",newsController.delete)
router.get("/get-paginate",newsController.paginate)
router.get("/search-news",newsController.search)

export default router