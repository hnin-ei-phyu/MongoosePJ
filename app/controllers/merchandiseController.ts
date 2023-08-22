import Merchandise from "../models/merchandise"
import HttpResponse from "../utilities/httpResponse"
import express from "express"
import Hepler from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import { defaultMaxListeners } from "events"

class MerchandiseController {
    
    async create(req: express.Request, res: express.Response): Promise<void> {
        const name: string = req.body.name
        const mine: string = req.body.merchandise
        const price: number = req.body.price 
        const photo: string = req.body.photo
        const detail: string = req.body.detail 
        const videos: string = req.body.videos
        const keywords: string = req.body.keywords 
        const thumbnanil: string = req.body.thumbnanil 
        const offical_remark: string = req.body.offical_remark

        try {
            let data = await Merchandise.create({
                name,
                mine,
                price,
                photo,
                detail,
                videos,
                keywords,
                thumbnanil,
                offical_remark
            })
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const result = await Merchandise.find().lean()
            if(!result){
                return HttpResponse.respondError(res,"Merchandise Not Found",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,result)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async get(req: express.Request, res: express.Response): Promise<void> {
        const itemId: string = req.params.id 
        try {
            let data = await Merchandise.findById(itemId).lean()
            if(!data) {
                return HttpResponse.respondError(res,"Merchandise Not Found",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
}