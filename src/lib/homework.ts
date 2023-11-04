import { get, post } from "./axios"
export type Homework = {
    ID: number,
    files: File,
    CourseID: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string,
    commentenddate: string
}
export function assignHomework(files: File, courseid: number, name: string, description: string, beginDate: Date, endDate: Date, commentenddate: Date) {
    return post(`/homework/assign`, {
        files,
        courseid,
        name,
        description,
        beginDate,
        endDate,
        commentenddate
    })
}

export function homeworklists(courseid: number) {
    return post(`/homework/homeworklists`, {
        courseid
    })
}