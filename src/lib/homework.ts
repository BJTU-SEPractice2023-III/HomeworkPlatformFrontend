import { get, post, del } from "./axios"
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
    return post(`/v1/homeworks`, {
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
export function getCourseHomeworks(id: number) {
    return get(`/v1/courses/${id}/homeworks`)
}

export function getHomework(id: number): Promise<Homework> {
    return get(`/v1/homeworks/${id}`)
}

export function delHomework(homeworkId: number) {
    return del(`/v1/homeworks/${homeworkId}`, {})
}

export function submit(files: File, answers: string) {
    return post(`/v1/submit`, {
        files,
        answers
    })
}