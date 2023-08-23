import express from "express"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import validator from "express-validator"
import SellerRouter from "../router/sellerRouter"
import AdminRouter from "../router/adminRouter"
import BuyerRouter from "../router/buyerRouter"
import AuctionRouter from "../router/auctionRouter"
import ComplainSectionRouter from "../router/complainSectionRouter"
import ConsultationRouter from "../router/consultationRouter"
import ContactRouter from "../router/contactRouter"
import NewsRouter from "../router/newsRouter"
import MerchandiseRouter from "../router/merchandiseRouter"
import PrivacyRouter from "../router/privacuRouter"

const app: express.Application = express()

app.use(bodyParser.json())
app.use(fileUpload({createParentPath: true}))
app.use(validator())

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*")
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
    res.set("Access-Control-Allow-Headers", "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Type, Date, X-Api-Version, x-access-token")

    next()
})

//router
app.use("/api/admin",AdminRouter)
app.use("/api/buyer",BuyerRouter)
app.use("/api/seller",SellerRouter)
app.use("/api/auction",AuctionRouter)
app.use("/api/complainSection",ComplainSectionRouter)
app.use("/api/consultation",ConsultationRouter)
app.use("/api/contact",ContactRouter)
app.use("/api/news",NewsRouter)
app.use("/api/merchandise",MerchandiseRouter)
app.use("/api/privacy",PrivacyRouter)

export default app
