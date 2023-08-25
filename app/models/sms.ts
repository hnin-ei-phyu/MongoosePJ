import { Schema, model } from "mongoose"

const smsSchema: Schema = new Schema(
    {
        authorization: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        sender: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const SMS = model("SMS",smsSchema)
export default SMS