import { Schema, model } from "mongoose"
import application from "../constants/application"

const buyerSchema : Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true

        },
        phoneNum: {
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
            default: 2
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
const Buyer = model("Buyer", buyerSchema)
export default Buyer
