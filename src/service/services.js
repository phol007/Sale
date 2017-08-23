import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  loginAX (user, pwd, success, error) {
    Vue.axios.get('http://venus:9000/login?usercode=' + user + '&password=' + pwd + '&appid=1').then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      })
  }
}
