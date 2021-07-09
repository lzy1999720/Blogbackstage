import { request } from './request.js'

export const getuser = () => {
  return request({
    method: 'get',
    url: '/user',
    data: {
    }
  })
}

export const deleteuser = (uid) => {
  return request({
    method: 'post',
    url: '/deleteuser',
    data: {
      uid
    }
  })
}

export const updateduser = ({ id, accountnumber, pwd, mailbox, role }) => {
  return request({
    method: 'post',
    url: '/updateduser',
    data: {
      id,
      accountnumber,
      pwd,
      mailbox,
      role
    }
  })
}

export const adduserinfo = ({accountnumber, pwd, mailbox, role,creationtime}) => {
  return request({
    method:'post',
    url:'/adduserinfo',
    data:{
      accountnumber,
      pwd,
      mailbox,
      role,
      creationtime
    }
  })
}