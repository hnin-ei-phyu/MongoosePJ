import mongoose, { Schema, model } from "mongoose"

const auctionSchema: Schema = new Schema (
    {
        title: {
                type: String,
                required: true
        },
        startPrice: {
                type: Number,
                required: true
        },
        endDate: {
                type: String,
                required: true
        },
        photos: {
                type: String,
                required: true
        },
        category: {
                type: String,
                required: true
        },
        mine: {
                type: String,
                required: true
        },
        owner: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "Seller"
        }
    },
    {
        timestamps: true
    }
)
const Auction = model("Auction", auctionSchema)
export default Auction