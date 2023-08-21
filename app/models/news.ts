import { Schema, model } from "mongoose"
const newsSchema: Schema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        article: {
            type: String,
            required: true
        },
        creditTo: {
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
const News = model("News", newsSchema)
export default News