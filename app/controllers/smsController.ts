import SMS from "../models/sms"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"

class SMSController{

    async create(req: express.Request, res: express.Response): Promise<void> {
        const authorization: string = req.body.authorization 
        const url: string = req.body.url 
        const sender: string = req.body.sender 
        const message: string = req.body.message 
        try {
            let sms = await SMS.create({
                authorization,
                url,
                sender,
                message
            })
            HttpResponse.respondResult(res,sms)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async get(req: express.Request, res: express.Response): Promise<void> {
        const smsId: string = req.params.id 
        try {
            let sms = await SMS.findById(smsId).lean()
            HttpResponse.respondResult(res,sms)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async update(req: express.Request,res: express.Response): Promise<void> {

        const smsId: string = req.body.id
        const authorization: string = req.body.authorization 
        const url: string = req.body.url 
        const sender: string = req.body.sender 
        const message: string = req.body.message 
        try {
            let sms = await SMS.findById(smsId).lean()
            if(!sms) {
                return HttpResponse.respondError(res,"SMS Not Found!",StatusCodes.NOT_FOUND)
            }
            await SMS.findByIdAndUpdate(smsId,{
                authorization,
                url,
                sender,
                message
            })
            HttpResponse.respondStatus(res, "SMS Updated successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
}
export default SMSController