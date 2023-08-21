import axios from "axios"
import { string } from "joi"

class Buyer {
    root: string = "http://localhost:3000/api/buyer"
    buyerId: string
    constructor(buyerId: string){
        this.buyerId = buyerId
    }

    async get(token: any = false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/get-buyer/${this.buyerId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async updateInfo(updateField: object, token: any =false){
        let headers: any = {}
        updateField = {
            username: string,
            phoneNum: string,
            address: string
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-info/${this.buyerId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async updatePassword(updateField: object, token: any= false){
        let headers: any = {}
        updateField = {
            password: string
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-password/${this.buyerId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async delete(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.delete(`${this.root}/delete-buyer/${this.buyerId}`,{headers})
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
            username: string,
            email: string,
            password: string,
            phoneNum: string,
            address: string,
            role: Number
    }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/create-buyer`,document,{headers})
            return result 
        } catch (error) {
            throw error 
        }
    }

    async login(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/login-buyer`,{headers})
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
export default Buyer