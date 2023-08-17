import { Schema, model } from "mongoose"

const complainSectionSchema: Schema = new Schema(
    {
        userToReport: {
            type: String,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const ComplainSection = model("ComplainSection",complainSectionSchema)
export default ComplainSection