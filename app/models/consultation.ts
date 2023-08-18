import { Schema, model } from "mongoose"
import mongoose from "mongoose"

const consultationSchema: Schema = new Schema(
    {
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Byuer"
        },
        answered: {
            type: String,
            required: false
        },
        answer: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
)
const Consultation = model("Consultation", consultationSchema)
export default Consultation