import jwt from 'jsonwebtoken'
export const formatTime = (date) => { //时间戳转换
  var d = new Date(date);
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
}


export const analysis = (token) => {                                   //token解析       
  return jwt.verify(token, 'Fizz', (err, token) => {
    return token
  })
}