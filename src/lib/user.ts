import { get, post, put, putFormData } from './axios'

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


export function getUserById(id: number) {
  return get(`/v1/users/${id}`)
}

export function getUserAvatarById(id: number) {
  return get(`/v1/users/${id}/avatar`)
}
 
export function editSignature(signature: string) {
  return put(`/v1/users/signature`, {
    signature
  })
}

export function headerPicture(picture: File) {
  const formData = new FormData();
  formData.append('avatar', picture);
  return putFormData(`/v1/users/avatar`, formData);
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