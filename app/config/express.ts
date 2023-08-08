import express from "express"
import path from "path"
import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import validator from "express-validator"
import application from "../constants/application"

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

//pp.use(application.url.base)

export default app
