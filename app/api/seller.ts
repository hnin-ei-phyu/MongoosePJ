import axios from "axios"

class Seller {
    root: string = "http://localhost:3000/api/seller"
    sellerId: string
    constructor(sellerId: string){
        this.sellerId = sellerId
    }

    async get(token: any = false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/get-seller/${this.sellerId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async updateInfo(updateField: object, token: any =false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-info/${this.sellerId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async updatePassword(updateField: object, token: any= false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-password/${this.sellerId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async delete(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.delete(`${this.root}/delete-seller/${this.sellerId}`,{headers})
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
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/create-seller`,document,{headers})
            return result 
        } catch (error) {
            throw error 
        }
    }

    async login(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/login-seller`,{headers})
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
export default Seller