import Consultation from "../models/consultation";
import express from "express"
import HttpResponse from "../utilities/httpResponse";
import { StatusCodes } from "http-status-codes"
import Buyer from "../models/buyer"


class ConsultationController{

    async get(req: express.Request, res: express.Response): Promise<void> {
        const requestedBy: string = req.params.id 
        try {
            const data = await Consultation.findById(requestedBy).lean()
            if(!data) {
                return HttpResponse.respondError(res,"Data not found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const requestedBy: string = req.params.id 
        try {
            const data = await Consultation.findById(requestedBy).lean()
            if(!data) {
                return HttpResponse.respondError(res,"Data not Found!",StatusCodes.NOT_FOUND)
            }req
            await Consultation.findByIdAndDelete(requestedBy)
            HttpResponse.respondStatus(res,"Consultation deleted successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async create(req: express.Request,res: express.Response): Promise<void> {
 
    
        const question: string = req.body.question
        const requestedBy = await Buyer.findOne().populate("_id")
        .populate("username")
        .populate("phoneNum")

        try {
            const data = await Consultation.create({

                question,
                requestedBy
            })
            HttpResponse.respondResult(res, data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const data = await Consultation.find().lean()
            if(!data) {
                return HttpResponse.respondError(res,"Data not found",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,data)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.query.sort || -1

        try {
            const totalCount: number = await Consultation.count()
            const totalPages: number = Math.floor(totalCount/page) + 1
            const skip: number = (page-1) * perPage
            const complainSections: any[] = await Consultation.find()
                .sort({
                    createdAt: sort
                })
                .populate("buyer", "_id usename phoneNumber")
                .skip(skip)
                .limit(perPage)
                .lean()

            const pagination = {
                lastPage: totalPages, perPage,
                currentPage: page,
                total: totalCount,
                count: complainSections.length
            }
            HttpResponse.respondPagination(res,complainSections,pagination)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }
}

export default ConsultationController