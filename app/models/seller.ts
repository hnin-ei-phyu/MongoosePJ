import { Schema, model } from "mongoose"
import application from "../constants/application"

const sellerSchema : Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        phoneNum: {
            type: String,
            required: true
        },
        nrcNumber: {
            type: String,
            required: true

        },
        address: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            min: 0,
            max: 2,
            default: "silver"
        },
        bio: {
            type: String,
            required: false
        },
        rating: {
            type: Number,
            default : 3
        },
        profile: {
            required: false
        },
        registered: {
            required: true
        }
    },
    {
        virtuals: {
            roleLabel: {
                get() {
                    return application.userRoles[this.role]
                }
            }
        },
        timestamps: true
    }
)
const Seller = model("Seller", sellerSchema)
export default Seller
