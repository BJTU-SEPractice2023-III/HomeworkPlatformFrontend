import { createStore } from 'solid-js/store'
import { Course, UserCourse, getLearningCourses, getTeachingCourses, getUserCourses } from './course'
import { onMount } from 'solid-js';

interface User {
  id: number,
  username: string,
  is_admin: boolean,
}

const loginInfoStore = createStore<{ jwt?: string, user?: User }>()
const loginInfoStoreInit = () => {
  const [loginInfo, _setLoginInfo] = loginInfoStore;

  console.log("[LoginInfoStore/init]")
  const jwt = localStorage.getItem('jwt')
  const userString = localStorage.getItem('user')
  if (!jwt || !userString) return

  console.log('[LoginInfoStore/init]: loading from localStorage')
  const user = JSON.parse(userString) as unknown as User
  _setLoginInfo(() => {
    return { jwt, user }
  })
}
loginInfoStoreInit()

export const LoginInfoStore = () => {
  const [loginInfo, _setLoginInfo] = loginInfoStore;

  const setLoginInfo = (jwt: string, user: User) => {
    console.log('[LoginInfoStore/setLoginInfo]: ', loginInfo)
    _setLoginInfo(() => {
      return { jwt, user }
    })
    localStorage.setItem('jwt', jwt)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const user = () => {
    return loginInfo.user
  }

  const jwt = () => {
    return loginInfo.jwt
  }

  return { loginInfo, setLoginInfo, user, jwt }
}


const userCoursesStore = createStore<UserCourse[]>([])
export const UserCoursesStore = () => {
  const [userCourses, setUserCourses] = userCoursesStore;

  const learningCourses = (): UserCourse[] => {
    return userCourses.filter((course) => course.CourseType == 0)
  }
  // const isExist = (course: Course) => {
  //   const c = userCourses.find((c) => c.ID == course.ID)
  //   return c != undefined
  // }
  const isLearning = (course: Course) => {
    const c = userCourses.find((c) => c.ID == course.ID)
    return c != undefined && c.CourseType == 0
  }
  const isTeaching = (course: Course) => {
    const c = userCourses.find((c) => c.ID == course.ID)
    return c != undefined && c.CourseType == 1
  }

  const teachingCourses = (): UserCourse[] => {
    return userCourses.filter((course) => course.CourseType == 1)
  }

  const updateUserCourses = async () => {
    const { user } = LoginInfoStore()
    if (!user().id) return
    // console.log('[UserCoursesStore/updateUserCourses]: fetching user courses')

    const res = await getUserCourses(user().id)
    // console.log('[UserCoursesStore/updateUserCourses]: user courses: ', res)
    setUserCourses(res)
  }

  return { userCourses, setUserCourses, updateUserCourses, learningCourses, teachingCourses, isLearning, isTeaching }
}
