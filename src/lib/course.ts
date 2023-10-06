import { get } from "./axios"

export type Course = {
    ID: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string
}

export function getCourses(): Promise<Course []> {
    return get('/course')
}

export function getCourse(id: number): Promise<Course> {
    return get(`/course/${id}`)
}