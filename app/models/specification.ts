import  { Schema, model } from "mongoose"

const specificationSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String
        },
        values: {
            type: Array, "default": [],
        }
    },
    {
        timestamps: true
    }
)
const Specification = model("Specification",specificationSchema)
export default Specification