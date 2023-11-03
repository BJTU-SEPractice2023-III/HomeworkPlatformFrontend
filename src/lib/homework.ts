import { get, post } from "./axios"

export function assignHomework(courseid:number ,name: string, description: string, beginDate: Date, endDate: Date,commentenddate:Date) {
    return post(`homework/assign`, {
        courseid,
        name,
        description,
        beginDate,
        endDate,
        commentenddate
    })
}