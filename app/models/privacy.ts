import { Schema, model } from "mongoose"

const privacySchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        info: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const Privacy = model("Privacy", privacySchema)
export default Privacy
