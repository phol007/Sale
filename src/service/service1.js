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
  genDocNoAX (tablecode, billtype, success, error) {
    Vue.axios.get('http://venus:3000/docno?table_code=' + tablecode + '&bill_type=' + billtype).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchItemAX (keyword, billtype, isCon, arCode, success, error) {
    Vue.axios.get('http://venus:8000/items?access_token=&bill_type=' + billtype + '&ar_code=' + arCode + '&isCon=' + isCon + '&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  itemAx (type, keyword, itemCode, success, error) {
    var url = ''
    // switch (type) {
    //   case 0:
    //     url = 'http://nopadol.net:8001/items?access_token=&keyword=' + keyword
    //     break
    //   case 1:
    //     url = 'http://venus:3000/item?access_token=&item_code=' + itemCode
    //     break
    // }
    url = 'http://nopadol.net:8001/items?access_token=&keyword=8852437'
    Vue.axios.get(url).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
      )
  },
  searchItemAX1 (keyword, billtype, isCon, arCode, success, error) {
    Vue.axios.get('http://venus:8000/items?access_token=&bill_type=' + billtype + '&ar_code=' + arCode + '&isCon=' + isCon).then(
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
  searchCustAx (keyword, arcode, success, error) {
    var url = ''
    url = 'http://venus:3000/customers?access_token=&keyword=' + keyword
    Vue.axios.get(url).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchCustmerAx (arcode, success, error) {
    var url = ''
    url = 'http://venus:3000/customer?access_token=&cust_code=' + arcode
    Vue.axios.get(url).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchSaleAX (keyword, salecode, success, error) {
    Vue.axios.get('http://venus:3000/employees?access_token=&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  insertSaleOrderAX (obj, success, error) {
    Vue.axios.post('http://venus:3000/saleorder', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  }
}
