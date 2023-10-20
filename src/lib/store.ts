import { createStore } from 'solid-js/store'
import { getLearningCourses, getTeachingCourses } from './course'

export const [store, setStore] = createStore({
    teachingCourses: [],
    learningCourses: [],
})

export const updateCourses = async () => {
    const learningCourses = await getLearningCourses()
    setLearningCourses(learningCourses)
    const teachingCourses = await getTeachingCourses()
    setTeachingCourses(teachingCourses)
}

export const teachingCourses = () => store.teachingCourses
export const setTeachingCourses = (courses) => {
    setStore('teachingCourses', courses)
    console.log("setStore teachingCourses:", courses)
}

export const learningCourses = () => store.learningCourses
export const setLearningCourses = (courses) => {
    setStore('learningCourses', courses)
    console.log("setStore learningCourses:", courses)
}

export const isLearing = (course): boolean => {
    return store.learningCourses.find((e) => e.ID == course.ID)
}

export const isTeaching = (course): boolean => {
    return store.teachingCourses.find((e) => e.ID == course.ID)
}
