import axios from 'axios'

const host = 'http://127.0.0.1:8888/api'

export function get(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${host}${url}`, {
        timeout: 3000,
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        resolve(res.data.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function post(url: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.post(`${host}${url}`, data, {
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function postFormData(url: string, data: FormData): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.post(`${host}${url}`, data, {
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}