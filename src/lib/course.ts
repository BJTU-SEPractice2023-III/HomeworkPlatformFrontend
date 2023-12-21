import { get, post, postFormData } from "./axios"

export type Course = {
    id: number,
    name: string,
    description: string
    beginDate: string,
    endDate: string,
    teacherID: number,
}

export type Student = {
    id: number,
    username: string
}

export interface UserCourses {
    teachingCourses?: Course[]
    learningCourses?: Course[],
}

export function getUserCourses(id: number): Promise<UserCourses> {
    return get(`/v1/users/${id}/courses`)
}

export function getCourses(): Promise<Course[]> {
    return get('/v1/courses')
}

export function getCourse(id: number): Promise<Course> {
    console.log("get", id)
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
    return post(`/v1/courses/${courseId}/students`, {

    })
}

export function getCourseStudents(id: number) {
    return get(`/v1/courses/${id}/students`)
}

export function createCourseHomework(id: number, name: string, description: string, beginDate: Date, endDate: Date, commentEndDate: Date, files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    })
    formData.set("name", name)
    formData.set("description", description)
    formData.set("beginDate", beginDate.toISOString());
    formData.set("endDate", endDate.toISOString());
    formData.set("commentEndDate", commentEndDate.toISOString());

    return postFormData(`/v1/courses/${id}/homeworks`, formData);
}