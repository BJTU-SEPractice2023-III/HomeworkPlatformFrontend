// import { get } from "./axios"
import {get,post} from "./axios"

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

export function getTeachingCourse(): Promise<Course []> {
    return get('/course/teachingcourse')
}

export function getLearningCourse(): Promise<Course []> {
    return get('/course/learningcourse')
}

export function create(name: string, description: string, beginDate: Date, endDate: Date) {
    return post(`/course/create`, {
      name: name,
      description: description,
      beginDate: beginDate,
      endDate: endDate
    })
  }