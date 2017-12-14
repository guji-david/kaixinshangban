import axios from 'axios'
let getTimestamp=new Date().getTime();//当前时间
const API_HOST = process.env.API_ROOT;
const PC_HOST = process.env.PC_ROOT;
// const API_HOST="http://127.0.0.1:8080/console";//test
// const API_HOST="https://cms.jintoushou.com/console";//prod
/**
 * 发送网络请求 host为API_HOST
 */
export function postRequest(action, obj, successFun,errorFun) {
  let exp = new Date();
  exp.setTime(exp.getTime() + 1800000);//每次调用后的token有效期为半个小时

  if(window.sessionStorage['Console-token']){//如果cookie的console-token存在的话
    // let reg = new RegExp("(^| )"+'Console-token'+"=([^;]*)(;|$)");
    // let cookieArr = document.cookie.match(reg);
    // axios.defaults.headers.common['Console-token'] =  cookieArr[2];
    axios.defaults.headers.common['Console-token'] =  window.sessionStorage['Console-token'];
    // console.log(`sendCookie--${window.sessionStorage['Console-token']}`);
  }

  axios.post(API_HOST + action + "?timestamp=" + getTimestamp , obj )//URL已增加时间戳
  // axios.post(API_HOST + action  , obj )//URL已增加时间戳
    .then(function (response) {
      if(response.data.resultMsg === '用户token失效'){
        let r = confirm("token失效,请退出重新登录!");
        if (r == true){
          localStorage.clear();
          sessionStorage.clear();
          location.href = location.origin
        }
        else{
          alert('再此状态下请不要随意操作,并且任何操作均已失效');
          return
        }
      }
      // if(document.cookie.indexOf ('Console-token') < 0){//如果cookie的console-token不存在的话
      if(!window.sessionStorage['Console-token']){//如果cookie的console-token不存在的话
        if(action=="/gateway/user/login"||action=="/gateway/user/getCode"){
          if(!response.data.data){
            successFun(response.data);
            return;
          }
        }
        if(!response.data.data.user.token){
          //confirm提示框
          // let r = confirm("token失效,请退出重新登录!");
          // if (r == true){
          //   localStorage.clear();
          //   sessionStorage.clear();
          //   location.href = location.origin
          // }
          // else{
          //   alert('再此状态下请不要随意操作,并且任何操作均已失效');
          //   return
          // }
          return;
        }else{
          // document.cookie='Console-token=' + response.data.data.user.token+";expires=" + exp.toUTCString() +";path=/";//加了过期时间和路径
          window.sessionStorage['Console-token'] = response.data.data.user.token;
        }

      }

      if (typeof (response.data.data)==="string" && (/^[\[\],:{}\s]*$/).test(response.data.data) ){
        successFun(JSON.parse(response.data.data));
      }else{
        successFun(response.data);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
      errorFun(error);
    });
}
