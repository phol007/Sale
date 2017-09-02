import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'

Vue.use(Vueaxios, axios)

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
      case 1:
        url = 'http://venus:3000/quotations/search?access_token=&doc_type=' + doctype + '&keyword=' + keyword
        break
      case 2:
        url = 'http://venus:3000/saleorders/search?access_token=&doc_type=' + doctype + '&keyword=' + keyword
        break
    }
    Vue.axios.get(url).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      })
  },
  gen_docNOAX (tablecode, billtype, success, error) {
    Vue.axios.get('http://venus:3000/docno?table_code=' + tablecode + '&bill_type=' + billtype).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchArAX (keyword, success, error) {
    Vue.axios.get('http://venus:3000/customers?access_token=&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchEmpAX (keyword, success, error) {
    Vue.axios.get('http://venus:3000/employees?access_token=&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchItemAX (keyword, billtype, isCon, arCode, vatType, success, error) {
    Vue.axios.get('http://venus:8000/items?access_token=&bill_type=' + billtype + '&ar_code=' + arCode + '&isCon=' + isCon + '&vatType=' + vatType + '&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  insertQTAX (obj, success, error) {
    Vue.axios.post('http://venus:3000/quotation', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  cancelQTAX (obj, success, error) {
    Vue.axios.put('http://venus:3000/quotation/cancel', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  }
}
