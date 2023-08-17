import ComplainSection from "../models/complainSection";
import express from "express"
import HttpResponse from "../utilities/httpResponse";
import { StatusCodes }  from "http-status-codes"

class ComplainSectionController {
    
    async get(req: express.Request, res: express.Response): Promise<void> {
        const complainSectionId: string = req.params.id 
        try {
            const complainSection = await ComplainSection.findById(complainSectionId).lean()
            if(!complainSection) {
                return HttpResponse.respondError(res, "ComplainSection not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,complainSection)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const complainSectionId: string = req.params.id 
        try {
            const complainSection = await ComplainSection.findById(complainSectionId).lean()
            if(!complainSection) {
                return HttpResponse.respondError(res, "ComplainSection Not Found! ",StatusCodes.NOT_FOUND)
            }
            await ComplainSection.findByIdAndDelete(complainSectionId)
            HttpResponse.respondStatus(res, "ComplainSection deleted successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const userToReport: string = req.body.userToReport
        const reason: string = req.body.reason
        const photo: string = req.body.photo
        try {
            await ComplainSection.create({
                userToReport,
                reason,
                photo
            })
            HttpResponse.respondStatus(res, "ComplainSection created successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const complainSection = await ComplainSection.find().lean()
            if(!complainSection) {
                HttpResponse.respondError(res, "ComplainSection Not Found!", StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,complainSection)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const complainSectionId: string = req.params.id 
        const userToReport: string = req.body.userToReport
        const reason: string = req.body.reason
        const photo: string = req.body.photo

        try {
            const complainSection = await ComplainSection.findById(complainSectionId).lean()
            if(!complainSection){
                return HttpResponse.respondError(res,"ComplainSection Not Found!",StatusCodes.NOT_FOUND)
            }
            await ComplainSection.findByIdAndUpdate(complainSectionId,{
                userToReport,
                reason,
                photo
            })
            HttpResponse.respondStatus(res,"ComplainSectoin updated successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.query.sort || -1

        try {
            const totalCount: number = await ComplainSection.count()
            const totalPages: number = Math.floor(totalCount/page) + 1
            const skip: number = (page-1) * perPage
            const complainSections: any[] = await ComplainSection.find()
                .sort({
                    createdAt: sort
                })
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
export default ComplainSectionController