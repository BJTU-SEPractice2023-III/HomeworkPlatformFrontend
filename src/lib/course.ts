import { get } from "./axios"

type course = {
    ID: number,
    name: string,
    description: string
    begin_date: string,
    end_date: string
}

export function getCourses() {
    return get('/course')
}