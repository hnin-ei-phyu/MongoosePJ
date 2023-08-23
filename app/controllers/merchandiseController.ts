import Merchandise from "../models/merchandise"
import HttpResponse from "../utilities/httpResponse"
import express from "express"
import Hepler from "../utilities/helper"
import { StatusCodes } from "http-status-codes"

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

    async update(req: express.Request, res: express.Response): Promise<void> {
        const itemId: string = req.params.id 
        const name: string = req.body.name
        const mine: string = req.body.mine 
        const price: number = req.body.price
        const photo: string = req.body.photo 
        const detail: string = req.body.detail 
        const videos: string = req.body.videos 
        const keywords: string = req.body.keywords 
        const thumbnail: string = req.body.thumbnail
        const official_remark: string = req.body.offical_remark 

        try {
            const merchandise = await Merchandise.findById(itemId).lean()
            if(!merchandise) {
                return HttpResponse.respondError(res, "Merchandise not found!",StatusCodes.NOT_FOUND)
            }
            await Merchandise.findByIdAndUpdate(itemId,{
                name,
                mine,
                price,
                photo,
                detail,
                videos,
                keywords,
                thumbnail,
                official_remark
            })
            HttpResponse.respondStatus(res,"Merchandise updated successfully!")
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

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const itemId: string = req.params.id
        try {
            let data = await Merchandise.findById(itemId).lean()
            if(!data) {
                return HttpResponse.respondError(res,"Merchandise Not Found!",StatusCodes.NOT_FOUND)
            }
            await Merchandise.findByIdAndDelete(itemId)
            HttpResponse.respondStatus(res,"Merchandise deleted successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.params.sort || -1 

        try {
            const totalCount: number = await Merchandise.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const items: any[] = await Merchandise.find()
                .sort({
                    createdAt: sort
                })
                .skip(skip)
                .limit(perPage)
                .lean()

                const pagination = {
                    lastPage: totalPages,perPage,
                    currentPage: page,
                    total: totalCount,
                    count: items.length
                }
                HttpResponse.respondPagination(res,items,pagination)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
     }
}

export default MerchandiseController