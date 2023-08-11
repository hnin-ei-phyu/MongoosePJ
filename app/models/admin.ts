import { Schema, model } from "mongoose"
import application from "../constants/application"

const adminSchema: Schema = new Schema(
    {
        name: {
                type: String,
                required: true,
                unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNum: {
            type: Number,

        },
        password: {
            type: String,

        },
        role: {
            type: Number,
            min: 0,
            max: 2,
            default: 0
        }
    },
    {
            virtuals: {
                roleLabel: {
                    get() {
                        return application.adminRoles[this.role]
                    }
                }
            },
            timestamps: true
    }
)
const Admin = model("Admin",adminSchema)
export default Admin