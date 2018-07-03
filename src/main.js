import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
// import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;// 去除console提示

//判断 开发环境 生产环境
if (process.env.NODE_ENV !== 'development') {
    Vue.prototype.URL_API = 'http://www.zjcoldcloud.com';
  } else {
    Vue.prototype.URL_API = 'api/';
}

/**
 * 请求公用方法
 * {
 * url: 接口地址
 * data: 传递数据
 * type: 请求方法
 * success: 成功方法
 * error: 失败方法
 * }
 */
Vue.prototype.$axios = ({
    url,
    type,
    data,
    success,
    error
}) => {

    if (type.toLowerCase() == 'post') {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios({
            url: Vue.prototype.URL_API + url,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                ret = ret.substr(0, ret.length - 1);
                return ret
            }]
        }).then((data) => {
            if (document.getElementById('loading')) {
                var timeout = setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                    clearTimeout(timeout);
                }, 300);
            }
            if (data.data.code == '401') {
                // token失效, 需要跳转重新登录;
                var a = window.location.href;
                a = a.split('#')[0];
                window.location.href = a + '#/';
                return;
            }
            success(data);
        }).catch(function (err) {
            // error(err);
        });
    } else if (type.toLowerCase() == 'get') {
        axios.get(conhead.HOST + url, {
            params: data
        }).then((data) => {
            if (document.getElementById('loading')) {
                var timeout = setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                    clearTimeout(timeout);
                }, 300);
            }
            if (data.data.code == '401') {
                // token失效, 需要跳转重新登录;
                var a = window.location.href;
                a = a.split('#')[0];
                window.location.href = a + '#/';
                return;
            }
            success(data);
        }).catch(function (err) {
            // error(err);
        });
    }
}






new Vue({
    router,
    render: h => h(App)
}).$mount('#app');