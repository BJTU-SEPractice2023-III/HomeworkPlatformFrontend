import { get, post, del } from "./axios"
export type Homework = {
    ID: number,
    files: File,
    CourseID: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string,
    commentEndDate: string
}
export interface StudentHomework extends Homework {
    submitted: boolean,
    score: number
}
export function getCourseHomeworks(id: number): Promise<StudentHomework[]> {
    return get(`/v1/courses/${id}/homeworks`)
}

export function getHomework(id: number): Promise<StudentHomework> {
    return get(`/v1/homeworks/${id}`)
}

export function delHomework(homeworkId: number) {
    return del(`/v1/homeworks/${homeworkId}`, {})
}

export function homeworksComment(id:number){
    return get(`/v1/homeworks/${id}/comments`)
}

export function submit(files: File, answers: string) {
    return post(`/v1/submit`, {
        files,
        answers
    })
}

export function notStartYet(homework: Homework) {
    return new Date(homework.beginDate) > new Date()
}

export function isEnded(homework: Homework) {
    return new Date(homework.endDate) < new Date()
}