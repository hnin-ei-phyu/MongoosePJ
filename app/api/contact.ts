import axios from "axios";
import { string } from "joi";

class Contact {
    root: string = "http://localhost:3000/api/contact"
    contactId: string
    constructor(contactId: string) {
        this.contactId = contactId
    }

    async create(document: object,token: any = false) {
        let headers = {}
        document = {
                phone: string, 
                pagelink: string,
                email: string,
                viber: string,
                map: string,
                address: string 
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.post(`${this.root}/create-contact`,document,{headers})
            return result
        } catch (error) {
            throw error
        }
    }

    async update(updateField: object, token: any =false){
        let headers: any = {}
        updateField = {
                phone: string, 
                pagelink: string,
                email: string,
                viber: string,
                map: string,
                address: string
        }
        if(token) headers["x-access-token"] = token
        try {
            let result = await axios.put(`${this.root}/update-contact/${this.contactId}`,updateField,{headers})
            return result
        } catch (error) {
            throw error
        }
    }


    async delete(token: any = false){
        let headers = {}
        if(token) headers["x-access-token"] = token 
        try {
            let result = await axios.delete(`${this.root}/delete-contact/${this.contactId}`,{headers})
            return result
        } catch (error) {
            throw error
        }
    }
}
export default Contact