import axios from "axios"

class ComplainSection {
    root: string = "http://localhost:3000/api/complainSection"
    complainSectionId: string
    constructor(complainSectionId: string){
        this.complainSectionId = complainSectionId
    }

    async get(token: any = false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.get(`${this.root}/get-complainSection/${this.complainSectionId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async update(updateField: object, token: any =false){
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-complainSection/${this.complainSectionId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async delete(token: any = false) {
        let headers: any = {}
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.delete(`${this.root}/delete-complainSection/${this.complainSectionId}`,{headers})
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
            let result = await axios.post(`${this.root}/create-complainSection`,document,{headers})
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
export default ComplainSection