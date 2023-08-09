import { Task } from "toad-scheduler"

const test = new Task(
    'test task',
    () => {
        console.log("Scheduled task")
    },
    (err: Error) => {
        console.log("error")
    }
)

export default {
    test
}