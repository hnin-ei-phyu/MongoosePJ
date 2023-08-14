import Buyer from "../models/buyer"
import express from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../interfaces/authedRequest"

class BuyerController{
    async get(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.params.id 

        try {
            const buyer = await Buyer.findById(buyerId).lean()
            if(!buyer){
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,buyer)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async delete(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.params.id 

        try {
            const buyer = await Buyer.findById(buyerId)
            if(!buyer) {
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
            }
            await Buyer.findByIdAndDelete(buyerId)
            HttpResponse.respondResult(res,"Buyer Deleted Successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = req.body.password 
        const phoneNum: string = req.body.phoneNum
        const address: string = req.body.address
        const role: number = req.body.role

        try {
            //Check if there's already with required Username and email
            const buyer = await Buyer.findOne({email}).lean()
            if(buyer){
                 return HttpResponse.respondError(res,"This user email is already used!",StatusCodes.CONFLICT)
            }
            await Buyer.create({
                username,
                email,
                password,
                phoneNum,
                address,
                role
            })
            HttpResponse.respondStatus(res,"Buyer Created Successfully1")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const admin = await Buyer.find().lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,admin)
         } catch (error) {
             HttpResponse.respondError(res,error)
         }
    }

    async update(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.params.id 
        const username: string = req.body.username
        const phoneNum: string = req.body.phoneNum
        const address: string = req.body.address
         try {
            const buyer = await Buyer.findById(buyerId).lean()
            if(!buyer){
                return HttpResponse.respondError(res,"Buyer not Found!",StatusCodes.NOT_FOUND)
            }
            await Buyer.findByIdAndUpdate(buyerId,{
                username,
                phoneNum,
                address
            })
            HttpResponse.respondStatus(res,"Buyer Updated Successfully!")
         } catch (error) {
            HttpResponse.respondError(res,error)
         }
    }

    async login(req: express.Request, res: express.Response): Promise<void> {
        const email: string  = req.body.emial 
        const password: string = Helper.getHashed(req.body.password)

        try {
            const buyer = await Buyer.findOne({
                email,
                password
            }).lean()

            if (!buyer) {
                return HttpResponse.respondError(res, "Username or password incorrect.", StatusCodes.UNAUTHORIZED)
            }
 
            HttpResponse.respondResult(res, buyer)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

     async updatePassword(req: express.Request, res: express.Response): Promise<void> {
        const buyerId: string = req.body.id 
        const oldPassword: string = req.body.oldPassword
        const newPassword: string = req.body.newPassword

        try {
            const buyer = await Buyer.findById(buyerId).lean()
            if(!buyer) {
                return HttpResponse.respondError(res,"Buyer not Found",StatusCodes.NOT_FOUND)
            }
            if(buyer.password != oldPassword){
                return HttpResponse.respondError(res,"Password not match",StatusCodes.BAD_REQUEST)
            }
            await Buyer.findByIdAndUpdate(buyerId,{
                password: newPassword
            })
            HttpResponse.respondStatus(res,"New password updated successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

     async paginate(req: express.Request, res: express.Response): Promise<void> {
        const page: any = req.query.page || 1
        const perPage: any = req.query.perPage || 10
        const sort: any = req.query.sort || -1

        try {
            const totalCount: number = await Buyer.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const admins: any[] = await Buyer.find()
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
    
     async verify(req: AuthedRequest, res: express.Response): Promise<void> {
        HttpResponse.respondResult(res, req.user)
    }
}
export default BuyerController