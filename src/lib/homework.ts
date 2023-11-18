import { get, post, del, put, putFormData } from "./axios"
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

export type commentHomework = {
    ID: number,
    files: File,
    homeworkId: number,
    CreatedAt: string,
    DeletedAt: string,
    UpdatedAt: string,
    content:string,
    score:number,
    userId:number
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

export function homeworksComment(id: number) {
    return get(`/v1/homeworks/${id}/comments`)
}

export function getSubmit(id: number) {
    return get(`/v1/submit/${id}`)
}

export function postComment(id: number, score: number, comment: string) {
    return post(`/v1/comment/${id}`, {
        score,
        comment
    })
}

export function putHomework(id: number, name: string, description: string, beginDate: Date, endDate: Date, commentEndDate: Date, files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    })
    formData.set("name", name)
    formData.set("description", description)
    formData.set("beginDate", beginDate.toISOString());
    formData.set("endDate", endDate.toISOString());
    formData.set("commentEndDate", commentEndDate.toISOString());

    return putFormData(`/v1/homeworks/${id}`, formData);
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