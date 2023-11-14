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
export function getCourseHomeworks(id: number): Promise<Homework[]> {
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