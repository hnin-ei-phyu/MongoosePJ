import Contact from "../models/contact"
import HttpResponse from "../utilities/httpResponse"
import StatusCodes from "http-status-codes"
import express from "express"

class ContactController {
    async create(req: express.Request, res: express.Response): Promise<void> {
        const phone: string = req.body.phone
        const pagelink: string = req.body.pagelink
        const email: string = req.body.email
        const viber: string = req.body.viber
        const map: string = req.body.map
        const address: string = req.body.address

        try {
            let contact = await Contact.create({
                phone,
                pagelink,
                email,
                viber,
                map,
                address
            })
            HttpResponse.respondResult(res,contact)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const contactId: string = req.params.id
        const phone: string = req.body.phone 
        const pagelink: string = req.body.pagelink
        const email: string = req.body.email
        const viber: string = req.body.viber
        const map: string = req.body.map 
        const address: string = req.body.address

        try {
            let contact = await Contact.findById(contactId).lean()
            if(!contact) {
                return HttpResponse.respondError(res, "Contact not found!",StatusCodes.NOT_FOUND)
            }
            let result = await Contact.findByIdAndUpdate(contactId,{
                phone, 
                pagelink,
                email,
                viber,
                map,
                address
            })
            HttpResponse.respondResult(res, result)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const contactId: string = req.params.id 
        try {
            let contact = await Contact.findById(contactId).lean()
            if(!contact) {
                return HttpResponse.respondError(res,"Contact Not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondStatus(res,"Contact deleted successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
}

export default ContactController