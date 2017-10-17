import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'

Vue.use(Vueaxios, axios)

// const URL = 'http://api.nopadol.com'
const URL = 'http://venus.nopadol.com'

export default {
  loginAX (user, pwd, success, error) {
    Vue.axios.get(URL + ':9000/login?usercode=' + user + '&password=' + pwd + '&appid=1').then(
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
        url = URL + ':3000/quotations/search?access_token=&doc_type=' + doctype + '&keyword=' + keyword
        break
      case 2:
        url = URL + ':3000/saleorders/search?access_token=&doc_type=' + doctype + '&keyword=' + keyword
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
    Vue.axios.get(URL + ':3000/docno?table_code=' + tablecode + '&bill_type=' + billtype).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchArAX (keyword, success, error) {
    Vue.axios.get(URL + ':3000/customers?access_token=&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchEmpAX (keyword, success, error) {
    Vue.axios.get(URL + ':3000/employees?access_token=&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchItemAX (keyword, billtype, isCon, arCode, vatType, success, error) {
    Vue.axios.get(URL + ':8000/items?access_token=&bill_type=' + billtype + '&ar_code=' + arCode + '&isCon=' + isCon + '&vatType=' + vatType + '&keyword=' + keyword).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  insertQTAX (obj, success, error) {
    Vue.axios.post(URL + ':3000/quotation', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  updateQTAX (obj, success, error) {
    Vue.axios.put(URL + ':3000/quotation', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  cancelQTAX (obj, success, error) {
    Vue.axios.put(URL + ':3000/quotation/cancel', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  approveQTAX (obj, success, error) {
    Vue.axios.put(URL + ':3000/quotation/approve', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  detailQTAX (docno, success, error) {
    Vue.axios.get(URL + ':3000/quotation?access_token=&doc_no=' + docno).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  searchUnitAX (items, billtype, isCon, arCode, vatType, success, error) {
    Vue.axios.get(URL + ':8000/item?access_token=&bill_type=' + billtype + '&ar_code=' + arCode + '&isCon=' + isCon + '&vatType=' + vatType + '&keyword=' + items).then(
      (response) => {
        success(response.data.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  insertSaleOrderAX (obj, success, error) {
    Vue.axios.post(URL + ':3000/saleorder', JSON.stringify(obj)).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  },
  detailSOAX (docno, success, error) {
    Vue.axios.get(URL + ':3000/saleorder?access_token=&doc_no=' + docno).then(
      (response) => {
        success(response.data)
      },
      (response) => {
        error(response)
      }
    )
  }
}
