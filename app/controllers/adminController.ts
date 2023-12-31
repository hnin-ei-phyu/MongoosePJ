import Admin from "../models/admin"
import express, { NextFunction } from "express"
import HttpResponse from "../utilities/httpResponse"
import Helper from "../utilities/helper"
import { StatusCodes } from "http-status-codes"
import AuthedRequest from "../interfaces/authedRequest"

class AdminController{

     async get(req: express.Request,res: express.Response): Promise<void> {
        const adminId: string = req.params.id

        try {
            const admin = await Admin.findById(adminId).lean()
            if(!admin) {
               return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
            }
            HttpResponse.respondResult(res,admin)
        } catch (error) {
            HttpResponse.respondError(res,error)
        }

    }

     async delete(req: express.Request, res: express.Response): Promise<void> {
        const adminId: string = req.params.id 

        try {
            const admin = await Admin.findById(adminId)
            if(!admin) {
               return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
            }
            await Admin.findByIdAndDelete(adminId)
            HttpResponse.respondResult(res,"Admin deleted Successfully !")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

     async create(req: express.Request, res: express.Response): Promise<void> {
        const username: string = req.body.username 
        const email: string = req.body.email 
        const phoneNum: number = req.body.phoneNum
        const password: string = Helper.getHashed(req.body.password)
        const role: number = req.body.role 

        try {
            //Check if there's already with required username
            const admin = await Admin.findOne({email}).lean()
            

            if(admin) {

               return HttpResponse.respondError(res,"There's already a user with this email",StatusCodes.CONFLICT)
            }

            await Admin.create({
                username,
                email,
                phoneNum,
                password,
                role
            })
            HttpResponse.respondStatus(res,"Admin created successfully!")
        } catch (error) {
            HttpResponse.respondError(res,error)
        }
    }

    async getAll(req: express.Request, res: express.Response): Promise<void> {
        try {
            const admin = await Admin.find().lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Admin not Found!",StatusCodes.NOT_FOUND)
             }
             HttpResponse.respondResult(res,admin)
         } catch (error) {
             HttpResponse.respondError(res,error)
         }
    }

     async update(req: express.Request, res: express.Response): Promise<void> {
        const adminId: string = req.params.id

        const username: string = req.body.username
        const phoneNum: string = req.body.phoneNum

        try {
            const admin = await Admin.findById(adminId).lean()

            if (!admin) {
                return HttpResponse.respondError(res, "Admin not found", StatusCodes.NOT_FOUND)
            }

            await Admin.findByIdAndUpdate(adminId, {
                username,
                phoneNum,
            })

            HttpResponse.respondStatus(res, "Admin updated successfully.")
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

     async login(req: express.Request, res: express.Response): Promise<void> {
        
        const email: string = req.body.email
        const password: string = Helper.getHashed(req.body.password)

        try {
            const admin = await Admin.findOne({
                email,
                password
            }).lean()
             
            if (!admin) {
                return HttpResponse.respondError(res, "Username or password incorrect.", StatusCodes.UNAUTHORIZED)
            }
 
            HttpResponse.respondResult(res, admin)
        } catch (error) {
            HttpResponse.respondError(res, error)
        }
    }

     async updatePassword(req: express.Request, res: express.Response): Promise<void> {
        const adminId: string = req.params.id
        const oldPassword: string = Helper.getHashed(req.body.oldPassword)
        const newPassword: string = Helper.getHashed(req.body.newPassword)

        try {
            const admin = await Admin.findById(adminId).lean()
            if(!admin) {
                return HttpResponse.respondError(res,"Admin not Found",StatusCodes.NOT_FOUND)
            }
            if(admin.password != oldPassword){
                return HttpResponse.respondError(res,"Password not match",StatusCodes.BAD_REQUEST)
            }
            await Admin.findByIdAndUpdate(adminId,{
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
            const totalCount: number = await Admin.count()
            const totalPages: number = Math.floor(totalCount / page) + 1
            const skip: number = (page-1) * perPage
            const admins: any[] = await Admin.find()
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
export default AdminController




