import axios from "axios"
import { string } from "joi"

class Auction {
    root: string = "http://localhost:3000/api/auction"
    auctionId: string
    constructor(auctionId: string){
        this.auctionId = auctionId
    }

    async get(token: any = false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/get-auction/${this.auctionId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async update(updateField: object, token: any =false){
        let headers: any = {}
        updateField = {
                title: string,
                startPrice: string,
                endDate: string,
                photos: string,
                category: string,
                mine: string
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-auction/${this.auctionId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async delete(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.delete(`${this.root}/delete-auction/${this.auctionId}`,{headers})
            return result 
        } catch (error) {
            throw error
        }
    }

    async getAll(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.get(`${this.root}/get-all`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async create(document: object,token: any = false) {
        let headers: any = {}
        document = {
                title: string,
                startPrice: string,
                endDate: string,
                photos: string,
                category: string,
                mine: string
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/create-auction`,document,{headers})
            return result 
        } catch (error) {
            throw error 
        }
    }

    async paginate(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/get-paginate`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }
}
export default Auction