import {  Schema, model } from "mongoose"

const contactSchema: Schema = new Schema(
    {
        phone: {
            type: String,
            required: true
        },
        pagelink: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        viber: {
            type: String,
            required: true
        },
        map: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const Contact = model("Contact",contactSchema)
export default Contact