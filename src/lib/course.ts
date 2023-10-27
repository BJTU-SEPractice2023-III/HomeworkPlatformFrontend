// import { get } from "./axios"
import { get, post } from "./axios"

export type Course = {
    ID: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string
}

export type UserCourse = {
    ID: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string
    CourseType: number
}

export function getUserCourses(id: number): Promise<UserCourse[]> {
    return get(`/users/${id}/courses`)
}

export function getCourses(): Promise<Course[]> {
    return get('/course')
}

export function getCourse(id: number): Promise<Course> {
    return get(`/course/${id}`)
}

export function getTeachingCourses(): Promise<Course[]> {
    return get('/course/teachingcourse')
}

export function getLearningCourses(): Promise<Course[]> {
    return get('/course/learningcourse')
}

export function create(name: string, description: string, beginDate: Date, endDate: Date) {
    return post(`/course/create`, {
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