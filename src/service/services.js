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
  },
  historyAX (keyword, doctype, success, error) {
    var url = ''
    switch (doctype) {
      case 1 : url = 'http://venus:3000/quotations/search?access_token=&doc_type=' + doctype + '&keyword=' + keyword
        break
      case 2 : url = 'http://venus:3000/saleorders/search?access_token=&doc_type=' + doctype + '&keyword=' + keyword
        break
    }
    Vue.axios.get(url).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      })
  }
}
