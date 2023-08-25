import Shop from "../models/shop";
import express from "express"
import HttpResponse from "../utilities/httpResponse";
import { StatusCodes } from "http-status-codes"

class ShopController{

    async create(req: express.Request,res: express.Response): Promise<void> {
        const name: string = req.body.name 
        const description: string = req.body.description 
        const logo: string = req.body.logo 
        const shopCategory: string = req.body.shopCategory 
        const categories: string = req.body.categories 
        const phoneNum : string = req.body.phoneNum 
        const address: string = req.body.address 
        const fbPageLink: string = req.body.fbPageLink

        try {
            let shop = await Shop.create({
                name,
                description,
                logo,
                shopCategory,
                categories,
                phoneNum,
                address,
                fbPageLink
            })
            HttpResponse.respondResult(res,shop)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async get(req: express.Request,res: express.Response): Promise<void> {
        const shopId: string = req.params.id 
        try {
            let shop = await Shop.findById(shopId).lean()
            if(!shop) {
                return HttpResponse.respondError(res,"Shot not found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,shop)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }

    }

    async update(req: express.Request,res: express.Response): Promise<void> {
        const shopId: string = req.params.id 
        const name: string = req.body.name 
        const description: string = req.body.description 
        const logo: string = req.body.logo 
        const shopCategory: string = req.body.shopCategory 
        const categories: string = req.body.categories 
        const phoneNum: string = req.body.phoneNum 
        const address: string = req.body.address 
        const fbPageLink: string = req.body.fbPageLink  
        try {
            const shop = await Shop.findById(shopId).lean()
            if(!shop) {
                return HttpResponse.respondError(res,"Shop Not Found!",StatusCodes.NOT_FOUND)
            }
            await Shop.findByIdAndUpdate(shopId,{
                name,
                description,
                logo,
                shopCategory,
                categories,
                phoneNum,
                address,
                fbPageLink
            })
            HttpResponse.respondStatus(res,"Shop updated sucessfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const shopId: string = req.params.id 
        try {
            let shop = await Shop.findById(shopId).lean()
            if(!shop) {
                return HttpResponse.respondError(res,"Shop not found!",StatusCodes.NOT_FOUND)
            }
            await Shop.findByIdAndDelete(shopId)
            HttpResponse.respondStatus(res,"Shop deleted successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
}

export default ShopController
