/*
 * @author: zhidl
 * @Date: 2019-06-13 14:57:46
 * @description: 
 */
import {
  axios
} from './axios';
import store from './../../store'
class Methods {
  constructor() {
    console.log('全局方法')
  }

  install(Vue, options) {
    this.installExtendsFunction();
    this.installPrototype(Vue);
    this.installFilter(Vue);
    this.installComponent(Vue);
  }
  /*------------------安装扩展方法------------------*/
  installExtendsFunction() {
    /**
     * 扩展时间对象，增加Format方法
     */
    (function () {
      /*对Date的扩展，将 Date 转化为指定格式的String
       月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
       年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
       例子：
       (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
       (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
       支持时间格式化*/
      Date.prototype.Format = function (fmt) {
        //author: meizz
        let o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (let k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1 ?
              o[k] :
              ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      // 字符串首尾去空格
      String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, '')
      }
    })();
  }
  /*------------------添加vue过滤器------------------*/
  installFilter(Vue) {
    /**
     * 格式化日期的过滤器
     * (yyyy-MM-dd)
     */
    Vue.filter("date-filter", function (time) {
      return new Date(time).Format("yyyy-MM-dd");
    });
    /**
     * 格式化日期+时间的过滤器
     * (yyyy-MM-dd hh:mm)
     */
    Vue.filter("date-time-filter", function (time) {
      return new Date(time).Format("yyyy-MM-dd hh:mm");
    });
  }

  /*------------------添加vue实例方法------------------*/
  installPrototype(Vue) {
    Vue.prototype.domainUrl = this.domainUrl;
    Vue.prototype.isEmpty = value => {
      if (
        value === null ||
        value === undefined ||
        value === "null" ||
        value === "undefined" ||
        value === ""
      ) {
        return true;
      } else {
        return false;
      }
    };
    Vue.prototype.setCookie = (key, val) => {
      let cdata = key + '=' + val
      let d = new Date()
      d.setHours(d.getHours() + 1)
      cdata += '; expires=' + d.toGMTString()
      document.cookie = cdata
    };
    Vue.prototype.getCookie = key => {
      let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
      let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
      if (arr === document.cookie.match(reg)) {
        return unescape(arr[2])
      } else {
        return null
      }
    };
    Vue.prototype.delCookie = key => {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1)
      let cval = Vue.prototype.getCookie(key)
      if (cval != null) {
        document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString()
      }
    };
    /**
     * get请求
     * @param url
     * @param data
     * @returns {Promise.<TResult>}
     */
    Vue.prototype.get = (url, data) => {
      return new Promise((resolve, reject) => {
        axios.get(url, {
          params: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }).then(response => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        })
      })
    };
    /**
     * post请求
     * @param url
     * @param data
     * @returns {Promise.<TResult>}
     */
    Vue.prototype.post = (url, data) => {
      return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          })
          .then(response => {
            resolve(response.data)
          }).catch((error) => {
            reject(error)
          })
      })
    };
    /**
     * 埋点请求
     * @param id[StringorNumber] 埋点id
     * @param data[Object] 埋点传的配置数据 没有可以不传
     * @returns {Promise.<TResult>}
     */
    Vue.prototype.track = (id, data) => {
      return new Promise((resolve, reject) => {
        let base = {
          extrack_arr: {
            ini_params: Object.assign({}, store.state.track_common, data ? data : {})
          },
          track_id: String(id)
        }
        if (store.state.track_url) {
          axios.post(store.state.track_url, base, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
            })
            .then(response => {
              resolve(response.data)
            }).catch((error) => {
              reject(error)
            })
        }
      })
    };
    /**
     * 打开新页面
     */
    Vue.prototype.openWin = (url) => {
      let a = document.createElement("a"); //创建a对象
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank")
      a.setAttribute("id", "camnpr");
      document.body.appendChild(a);
      a.click(); //执行当前对象
    }
  }
  /*------------------全局注册组件方法------------------*/
  installComponent(Vue) {
    // Vue.component('bread', () => import('../../components/bread.vue')) // 注册面包屑导航
    // Vue.component('ueditor', () => import('../../components/ueditor.vue')) // 注册富文本编辑器组件
  }
};
export default new Methods();
