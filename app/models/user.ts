import { Schema , model } from "mongoose"

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            default: "Inteli User"
        }
    },
    {
        timestamps: true
    }
)
const User = model("User", userSchema)
export default User