import { Schema, model } from "mongoose"
const shopSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        shopCategory: {
            type: String,
            required: true
        },
        categories: {
            type: Array,"default":[],
            required: false
        },
        phoneNum: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        fbPageLink: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const Shop = model("Shop",shopSchema)
export default Shop 