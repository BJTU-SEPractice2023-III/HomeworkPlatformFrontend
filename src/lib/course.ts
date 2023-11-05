import { get, post } from "./axios"

export type Course = {
    ID: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string
}

export type Student = {
    ID: number,
    name: string
}

export function getCourses(): Promise<Course[]> {
    return get('/v1/courses')
}

export function getCourse(id: number): Promise<Course> {
    return get(`/v1/courses/${id}`)
}

export function getTeachingCourses(): Promise<Course[]> {
    return get('/course/teachingcourse')
}

export function getLearningCourses(): Promise<Course[]> {
    return get('/course/learningcourse')
}

export function create(name: string, description: string, beginDate: Date, endDate: Date) {
    return post(`/v1/courses`, {
        name,
        description,
        beginDate,
        endDate
    })
}

export function selectCourse(courseId: number) {
    return post(`/course/select`, {
        courseId
    })
}

export function StudentList(id:number) {
    return get(`/v1/courses/${id}/students`)
}