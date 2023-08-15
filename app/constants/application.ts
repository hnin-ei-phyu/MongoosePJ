import dotenv from "dotenv"

//Load variables from .env
dotenv.config()

//Root url of the applicatoin
const base: string = "/api"

const application = {
    url: {
        base
    },
    adminRoles: ["Admin", "Editor"],
    userRoles: ["Seller", "Buyer"],
    env: {
        serverPort: process.env.SERVER_PORT || 3000,
        databaseUri: process.env.DATABASE_URI || "mongodb://localhost:27017/TycoonMongoose",
        domainName: process.env.DOMAIN_NAME || "localhost:3000",
        authSecret: process.env.TOKEN_SECRET_KEY || "jwt_default_key",
    }
}

export default application