import AuctionController from "../controllers/auctionController"
import express from "express"
const router = express.Router() 
const auctionController = new AuctionController()

router.get("/get-auction/:id",auctionController.get)
router.post("/create-auction",auctionController.create)
router.get("/get-all",auctionController.getAll)
router.put("/update-auction/:id",auctionController.update)
router.get("/get-paginate",auctionController.paginate)
router.delete("/delete-auction",auctionController.delete)

export default router 

