import axios from '../utils/http'

export const base = 'http://192.168.4.76:4000'

function getData (url) {
  return axios({
    method: 'get',
    url: url
  })
}

function postData (url, data) {
  return axios({
    method: 'post',
    url: url,
    data: data
  })
}

export function login(data){
  return postData(`${base}/login`, data)
}

export function logout(){
  return getData(`${base}/logout`)
}

export function getSelf(){
  return getData(`${base}/user`)
}

export function getUser(id){
  return getData(`${base}/user/${id}`)
}

// 文章列表
export function getArticle(page, limit){
  return getData(`${base}/article?page=${page}&limit=${limit}`)
}

// 文章分类列表
export function getSubArticle(type, page, limit){
  return getData(`${base}/article/${type}?page=${page}&limit=${limit}`)
}

// 文章详情
export function getArticleDetail(id){
  return getData(`${base}/article/detail/${id}`)
}

// 删除文章 
export function deleteArticle(id){
  return getDataWithToken(`${base}/article/delete/${id}`)
}

