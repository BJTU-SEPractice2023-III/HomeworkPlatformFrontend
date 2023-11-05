import { get, post } from './axios'

export function login(username: string, password: string) {
  return post(`/v1/user/login`, {
    username: username,
    password: password
  })
}

export function register(username: string, password: string) {
  return post(`/v1/user/register`, {
    username: username,
    password: password
  })
}