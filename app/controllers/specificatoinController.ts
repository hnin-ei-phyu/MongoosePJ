import Specification from "../models/specification";
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"
import express from "express"

class SpecificationController{
    
    async create(req: express.Request,res: express.Response): Promise<void> {
        const _id: string = req.body._id
        const type: string = req.body.type 
        const values: string[] = req.body.values
        try {
            const specification = await Specification.create({
                _id,
                type,
                values
            })
            HttpResponse.respondStatus(res,"Specification created successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async get(req: express.Request, res: express.Response): Promise<void> {
        const specificationId: string = req.params.id 
        try {
            const specification = await Specification.findById(specificationId).lean()
            if(!specification) {
                return HttpResponse.respondError(res, "Specificatoin Not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,specification)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request,res: express.Response): Promise<void> {
        try {
            const specification = await Specification.find().lean()
            if(!specification) {
                return HttpResponse.respondError(res,"Specification Not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,specification)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
}

export default SpecificationController