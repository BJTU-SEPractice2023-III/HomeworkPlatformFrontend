import { get, post } from './axios'

export function login(username: string, password: string) {
  return post(`/user/login`, {
    username: username,
    password: password
  })
}

export function register(username: string, password: string) {
  return post(`/user/register`, {
    username: username,
    password: password
  })
}