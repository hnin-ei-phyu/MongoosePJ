import Auction from "../models/auction"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import { StatusCodes } from "http-status-codes"
import Seller from "../models/seller"

class AcutionController{

    async get(req: express.Request, res: express.Response): Promise<void>{
        const auctionId: string = req.params.id 

        try {
            const auction = await Auction.findById(auctionId)
                .populate("owner", "_id uesrname phoneNum")
                .lean()

                if(!auction){
                    return HttpResponse.respondError(res,"Auction Not Found",StatusCodes.NOT_FOUND)
                }
                HttpResponse.respondResult(res,auction)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const auctionId: string = req.params.id
        try {
            const auction = await Auction.findById(auctionId).lean()
            if(!auction){
                return HttpResponse.respondError(res,"Auction Not Found!",StatusCodes.NOT_FOUND)
            }
            await Auction.findByIdAndDelete(auctionId)
            HttpResponse.respondStatus(res, "Auction deleted Successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async create(req: express.Request, res: express.Response): Promise<void> {

        const title: string = req.body.title
        const startPrice: number = req.body.startPrice
        const endDate: string = req.body.endDate
        const photos: string = req.body.photos
        const category: string = req.body.category
        const mine: string = req.body.mine
        const owner = await Seller.findOne().populate("username","phoneNum")
          
        try {
            
            let auction = await Auction.create({
                title,
                startPrice,
                endDate,
                photos,
                category,
                mine,
                owner
            })
            await auction.save()
            HttpResponse.respondStatus(res,"Auction created successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
    
    async getAll(req: express.Request,res: express.Response): Promise<void> {
        try {
            const auction = await Auction.find().lean()
            if(!auction){
                return HttpResponse.respondError(res,"Auction Not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,auction)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const auctionId: string = req.params.id
        const title: string = req.body.title 
        const startPrice: number = req.body.startPrice
        const endDate: string = req.body.endDate
        const photos: string = req.body.photos
        const category: string = req.body.category
        const mine: string = req.body.mine

        try {
            const auction = await Auction.findById(auctionId).lean()
            if(!auction){
                return HttpResponse.respondError(res,"Auciton Not found!",StatusCodes.NOT_FOUND)
            }
            await Auction.findByIdAndUpdate(auctionId,{
                title,
                startPrice,
                endDate,
                photos,
                category,
                mine
            })
            HttpResponse.respondResult(res,"Auction Updated Successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async paginate(req: express.Request,res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.query.sort || -1

        try {
            const totalCount: number = await Auction.count()
            const totalPages: number = Math.floor(totalCount/page)+1
            const skip: number = (page-1) * perPage
            const auctions: any[] = await Auction.find()
                .sort({
                    createdAt: sort
                })
                .skip(skip)
                .limit(perPage)
                .populate("owner", "_id usename phoneNum")
                .lean()

            const pagination = {
                lastPage : totalPages, perPage,
                currentPage : page,
                total : totalCount,
                count: auctions.length
            }
            HttpResponse.respondPagination(res,auctions,pagination)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }
}
export default AcutionController