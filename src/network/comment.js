import { request } from './request'

export const getleaveingword = () => {
  return request({
    method: 'get',
    url: '/getComment',
    data: {
    }
  })
}

export const updateCommentStatus = (lid,isexamine) => {
  return request({
    method:'post',
    url:'/updateCommentStatus',
    data:{
      lid,
      isexamine
    }
  })
}

export const deleteComment = (lid)=>{
  return request({
    method:'post',
    url:'/deleteComment',
    data:{
      lid
    }
  })
}




