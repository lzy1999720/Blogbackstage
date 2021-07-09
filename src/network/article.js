import { request } from './request'
export const selectarticledata = () => {
  return request({
    url: '/article'
  })
}

// select user,lvalue,ltime,mailbox,isexamine,aclass,a.aid from leaveword as a,article as b,articleclass as c where a.aid = b.aid and b.aclass = c.aclassvalue;
// select a.user,a.lvalue,a.ltime,a.mailbox,a.isexamine,a.aid,b.title,b.aclass from leaveword as a left join article as b on a.aid = b.aid join articleclass as c on b.aclass =c.aclassvalue;
export const updatearticle = ({aclass, title, content, apictureurl, releasetime, fabulous,aid}) => {
  return request({
    method: 'post',
    url: '/updateart',
    data: {
      aclass,
      title,
      content,
      apictureurl,
      releasetime,
      fabulous,
      aid
    },
  })
}

export const addarticles = ({aclass,title,content,releasetime,fabulous}) =>{
  return request({
    method:'post',
    url:'/addarticles',
    data:{
      aclass,
      title,
      content,
      releasetime,
      fabulous,
    }
  })
}

export const removearticles = (aid)=>{
  return request({
    method:'post',
    url:'/removearticles',
    data:{
      aid
    }
  })
}

export const search = (searchtitle)=>{
  return request({
    method:'post',
    url:'/searchad',
    data:{
      title:searchtitle
    }
  })
}