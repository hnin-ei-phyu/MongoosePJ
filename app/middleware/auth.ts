import express, { NextFunction } from "express"
import jwt from "jsonwebtoken"
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"
import Buyer from "../models/buyer"
import Seller from "../models/seller"
import Admin from "../models/admin"
import AuthedRequest from "../interfaces/authedRequest"
import application from "../constants/application"

class Auth {
     async isAdmin(req: AuthedRequest, res: express.Response, next: NextFunction): Promise<void> {

        //Get token from request
        const token: any = req.query.token || req.headers["x-access-token"]

        if(!token) {
            return HttpResponse.respondError(res,"Auth token is required",StatusCodes.UNAUTHORIZED)
        }
        try {
            let decoded: any = jwt.verify(token,application.env.authSecret) 

            //Find in Admin Collections
            const admin = await Admin.findOne({_id: decoded.id}).lean()
            if(!admin){
                HttpResponse.respondError(res,"You're not admin!",StatusCodes.UNAUTHORIZED)
            } else {
                req.user = admin
                req.user.role = "admin"
                next()
            }
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
     }

     async isBuyer(req: AuthedRequest,res: express.Response, next: NextFunction): Promise<void> {
       
        //Get token from request
        const token: any = req.query.token || req.headers["x-access-token"]

        if(!token) {
            return HttpResponse.respondError(res, "Auth token is required!", StatusCodes.UNAUTHORIZED)
        }
        try {
            let decoded: any = jwt.verify(token,application.env.authSecret)
            //Find in Seller Collections
            const seller = await Seller.findOne({_id: decoded.id}).lean()
            if(!seller){
                HttpResponse.respondError(res, "You're not buyer",StatusCodes.UNAUTHORIZED)
            } else {
                req.user = seller
                req.user.role = "buyer"
                next()
            }
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
     }

     async isSeller(req: AuthedRequest,res: express.Response, next: NextFunction): Promise<void> {
       
        //Get token from request
        const token: any = req.query.token || req.headers["x-access-token"]

        if(!token) {
            return HttpResponse.respondError(res, "Auth token is required!", StatusCodes.UNAUTHORIZED)
        }
        try {
            let decoded: any = jwt.verify(token,application.env.authSecret)
            //Find in Seller Collections
            const seller = await Seller.findOne({_id: decoded.id}).lean()
            if(!seller){
                HttpResponse.respondError(res, "You're not seller1",StatusCodes.UNAUTHORIZED)
            } else {
                req.user = seller
                req.user.role = "seller"
                next()
            }
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
     }
}
export default Auth