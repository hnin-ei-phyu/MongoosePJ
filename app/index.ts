import mongoose from "mongoose"
import app from "./config/express"
import application from "./constants/application"

const databaseUri = application.env.databaseUri
const port = application.env.serverPort

mongoose.set("strictQuery" , false);

mongoose
    .connect(databaseUri)
    .then(() => {
        console.log(`Connected to database at : ${databaseUri}`);

        //Start scheduled tasks
        //ScheduledTasks.startBackgroundTasks()

        //Listen express server
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        })
    }).catch((err) => {
        console.log(`Database connection failded with error : ${err}`)
    });