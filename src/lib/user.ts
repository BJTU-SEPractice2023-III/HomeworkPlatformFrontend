import { get, post } from './axios'

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

export function getUserInfo(id: number) {
  return get(`/v1/users/${id}`)
}

export function getUserCourses(id: number) {
  return get(`/v1/users/${id}/courses`)
}

export enum NotificationType {
  TeachingHomeworkInProgressNotification = 0,
  TeachingHomeworkCommentInProgressNotification = 1,
  LearningHomeworkInProgressNotification = 2,
  LearningHomeworkCommentInProgressNotification = 3,
  ComplaintToBeSolvedNotification = 4,
  ComplaintInProgressNotification = 5,
}

export interface Notification {
  notificationType: NotificationType
  notificationData: any
}

export function getNotifications(): Promise<Notification[]> {
  return get(`/v2/notifications`)
}