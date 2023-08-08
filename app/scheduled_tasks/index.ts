import { CronJob, ToadScheduler } from "toad-scheduler";
import jobs from "./jobs";

const startBackgroundTasks = function () {
    const scheduler = new ToadScheduler()

    /**
     * Assigned a cronjob for 10 hour every days
     * Eg: 05:00AM Jan 1st, 05:00AM Jan 2nd
     */
    const job = new CronJob({ cronExpression: "0 5 * * *"}, jobs.test)
    scheduler.addCronJob(job)
}
export default {
    startBackgroundTasks
}