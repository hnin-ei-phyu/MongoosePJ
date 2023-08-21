import axios from "axios"
import { string } from "joi"

class Admin {
    root: string = "http://localhost:3000/api/admin"
    adminId: string
    constructor(adminId: string){
        this.adminId = adminId
    }

    async get(token: any = false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/get-admin/${this.adminId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async updateInfo(updateField: object, token: any =false){
        let headers: any = {}
        updateField = {
            username: string,
            phoneNum: string
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-info/${this.adminId}`,updateField,{headers})
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
            let result = await axios.put(`${this.root}/update-password/${this.adminId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async delete(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.delete(`${this.root}/delete-admin/${this.adminId}`,{headers})
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
                phoneNum: string,
                password: string,
                role: Number
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/create-admin`,document,{headers})
            return result 
        } catch (error) {
            throw error 
        }
    }

    async login(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/login-admin`,{headers})
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
export default Admin