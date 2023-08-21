import News from "../models/news"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"
import { any, number } from "joi"

class NewsController {

    async create(req: express.Request,res: express.Response): Promise<void> {
        const title: string = req.body.title
        const thumbnail: string = req.body.thumbnail
        const article: string = req.body.article
        const creditTo: string = req.body.creditTo
        const photo: string = req.body.photo

        try {
            let news = await News.create({
                title,
                thumbnail,
                article,
                creditTo,
                photo
            })
            HttpResponse.respondResult(res,news)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async upadate(req: express.Request, res: express.Response): Promise<void> {
        const newsId: string = req.params.id 
        const title: string = req.body.title
        const thumbnail: string = req.body.thumbnail
        const article: string = req.body.article
        const creditTo: string = req.body.creditTo
        const photo: string = req.body.photo 

        try {
            let news = await News.findById(newsId).lean()
            if(!news) {
                return HttpResponse.respondError(res, "Nes not Found!",StatusCodes.NOT_FOUND)
            }
            await News.findByIdAndUpdate(news,{
                title,
                thumbnail,
                article,
                creditTo,
                photo
            })
            HttpResponse.respondStatus(res,"News updated successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async get(req: express.Request, res: express.Response): Promise<void> {
        const newsId: string = req.params.id 
        try {
            let news = await News.findById(newsId).lean()
            if(!news) {
                return HttpResponse.respondError(res,"News not found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,news)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
    
    async delete(req: express.Request,res: express.Response): Promise<void> {
        const newsId: string = req.params.id 
        try {
            let news = await News.findById(newsId).lean()
            if(!news) {
                return HttpResponse.respondError(res, "News Not Found!",StatusCodes.NOT_FOUND)
            }
            await News.findByIdAndDelete(newsId)
            HttpResponse.respondStatus(res,"News deleted successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
    
     async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            let news = await News.find().lean()
            if(!news) {
                return HttpResponse.respondError(res,"News not found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,news)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
     }
     
     async totalCount(req: express.Request, res: express.Response): Promise<void> {
        try {
            let news = await News.find().lean()
            if(!news) {
                return HttpResponse.respondError(res, "News not found!", StatusCodes.NOT_FOUND)
            }
            let count = await News.count()
            HttpResponse.respondResult(res,count)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
     }

     async search(req: express.Request, res: express.Response): Promise<void> {
        const searchText: string = req.params.searchText
        try {
            
            let result = await News.find({searchText}).lean()
            if(!result) {
                HttpResponse.respondError(res,"Data Not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res, result)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
     }

     async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.params.sort || -1 

        try {
            const totalCount: number = await News.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const admins: any[] = await News.find()
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
                    count: admins.length
                }
                HttpResponse.respondPagination(res,admins,pagination)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
     }
}

export default NewsController