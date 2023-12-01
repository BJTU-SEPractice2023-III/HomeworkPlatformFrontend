import axios from "axios"
import { get, post, del, put, putFormData } from "./axios"
export type Homework = {
    ID: number,
    files: File,
    courseId: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string,
    commentEndDate: string,
    file_paths : string[],
    content:string
}

export type commentHomework = {
    ID: number,
    files: File,
    homeworkId: number,
    CreatedAt: string,
    DeletedAt: string,
    UpdatedAt: string,
    content: string,
    score: number,
    userId: number
}
export type CommentTask = {
    commentId: number,
    comment: string,
    score: number,
    done: boolean,
    homeworkSubmissionId:number,
}

export interface StudentHomework extends Homework {
    submitted: boolean,
    score: number
}
export function getCourseHomeworks(id: number): Promise<StudentHomework[]> {
    return get(`/v1/courses/${id}/homeworks`)
}

export function getHomework(id: number): Promise<Homework> {
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

export function getMyGrade(id:number){
    return get(`/v1/grade/${id}`)
}

// export function getFiles(path:string) {
    // return get(`/v1/file/${path}`)
    // return axios.get(`/v1/file/${path}`, {
    //     responseType: 'blob',
    // })
// }

export function getSubmissionById(id:number){
    return get(`/v1/homeworks/${id}/submission`)
}

export function getMyComment(id:number){
    return get(`/v1/homeworks/${id}/mycomments`)
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

export function askPicture( files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    })
    return putFormData(`/v1/ai/spark/image`, formData);
}

export function askQuestion(context: string) {
    return post(`/v1/ai/spark`, {
        context
    })
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