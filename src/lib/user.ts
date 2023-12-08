import { get, post, put } from './axios'

export function login(username: string, password: string) {
  return post(`/v1/user/login`, {
    username: username,
    password: password
  })
}

export function register(username: string, password: string) {
  return post(`/v1/user`, {
    username: username,
    password: password
  })
}

export function getUserCourses(id: number) {
  return get(`/v1/users/${id}/courses`)
}

export function getNotifications(id: number) {
  return get(`/v1/users/${id}/notifications`)
}


export function getUserById(id: number) {
  return get(`/v1/users/${id}`)
}
 
export function editSignature(signature: string) {
  return put(`/v1/users/signature`, {
    signature
  })
}