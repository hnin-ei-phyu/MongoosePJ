import Privacy from "../models/privacy";
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"
import express from "express"

class PrivacyController {
    
    async create(req: express.Request, res: express.Response): Promise<void> {
        const title: string = req.body.title
        const info: string = req.body.info 
        const index: number = req.body.index 
        
        try {
            const privacy = await Privacy.create({
                title,
                info,
                index
            })
            HttpResponse.respondResult(res,privacy)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getALL(req: express.Request,res: express.Response): Promise<void> {
        try {
            const privacy = await Privacy.find().lean()
            if(!privacy){
                return HttpResponse.respondError(res,"Privacy Not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,privacy)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
    
    async get(req: express.Request, res: express.Response): Promise<void> {
        const privacyId: string = req.params.id 
        try {
            const privacy = await Privacy.findById(privacyId).lean()
            if(!privacy){
                return HttpResponse.respondError(res, "Privacy Not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,privacy)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const privacyId: string = req.params.id 
        const title: string = req.body.title 
        const info: string = req.body.info
        try {
            const privacy = await Privacy.findById(privacyId).lean()
            if(!privacy) {
                return HttpResponse.respondError(res,"Privacy Not Found!",StatusCodes.NOT_FOUND)
            }
            await Privacy.findByIdAndUpdate(privacyId,{
                title,
                info
            })
            HttpResponse.respondStatus(res,"Privacy updated successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const privacyId: string = req.params.id 
        try {
            const privacy = await Privacy.findById(privacyId).lean()
            if(!privacy) {
                return HttpResponse.respondError(res,"Privacy Not Found!",StatusCodes.NOT_FOUND)
            }
            await Privacy.findByIdAndDelete(privacyId)
            HttpResponse.respondStatus(res,"Privacy Deleted Successfully! ")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
}
export default PrivacyController