import api from '../service/services.js'
import moment from 'moment'
import $ from 'jquery'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'Qtd',
  data () {
    return {
      params: [],
      DocNo: '',
      vatType: 1,
      billType: 1,
      isConditionSend: 1,
      DocDate: '',
      nowDate: {},
      disabled: false,
      toDate: '',
      ExpDate: '',
      deliveryDate: '',
      sendpriceDay: 7,
      reciveDay: 7,
      expDay: 7,
      sendDay: 7,
      creditDay: 0,
      taxRage: 7,
      customer_lists: [],
      moScus: '',
      ArID: '',
      ArName: '',
      employee_lists: [],
      moSemp: '',
      EmpID: '',
      EmpName: '',
      item_lists: [],
      moSitem: '',
      detail_itemlists: []
    }
  },
  components: {    
    Datepicker
  },
  methods: {
  	SearchItem () {
      if(this.ArID){                 
        $('#SItem').addClass('is-active')     
        this.moSitem = ''
        this.searchItems(this.moSitem)
      }else{
        alert("กรุณาเลือกเจ้าหนี้ให้เรียบร้อย")
      }
  	},
  	CSItem () {
  		$('#SItem').removeClass('is-active')
  	},
  	SearchCusto () {
  		$('#SCusto').addClass('is-active')
      this.moScus = ''
      this.searchCus(this.moScus)
  	},
  	CSCusto () {
  		$('#SCusto').removeClass('is-active')
  	},
    SearchEmplo () {
      $('#SEmplo').addClass('is-active')
      this.moSemp = ''
      this.searchEmp(this.moSemp)
    },
    CSEmplo () {
      $('#SEmplo').removeClass('is-active')
    },
    goTo (page) {
      this.$router.push(page)
    },
    toDay () {
      var day = new Date()
      var d = day.getDate()
      var m = day.getMonth()
      var y = day.getFullYear()
      this.toDate = new Date(y, m, d)
    },
    searchCus (keyword) {
      $("#loading").addClass('is-active')
      api.searchArAX(keyword, 
        (result) => {
          $("#loading").removeClass('is-active')
          if(result.status == "success"){
            this.customer_lists = result.data
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          console.log(error) 
        })
    },
    selectCus (CusD) {
      this.CSCusto()
      this.ArID = CusD.ar_code
      this.ArName = CusD.ar_name
      //console.log(JSON.stringify(CusD))
    },
    searchEmp (keyword) {
      $("#loading").addClass('is-active')
      api.searchEmpAX(keyword, (result) => {
        $("#loading").removeClass('is-active')
        if(result.status == "success"){
          this.employee_lists = result.data
        }
      },
      (error) => {
        $("#loading").removeClass('is-active')
        console.log(error)
      })
    },
    selectEmp (EmpD) {
      this.CSEmplo()
      this.EmpID = EmpD.sale_code
      this.EmpName = EmpD.sale_name
    },
    searchItems (keyword) {
      // console.log(this.billType)
      // console.log(this.ArID)
      // console.log(this.isConditionSend)
      $("#loading").addClass('is-active')
      api.searchItemAX(keyword, this.billType, this.ArID, this.isConditionSend, 
        (result) => {
          $("#loading").removeClass('is-active')
          if(result.status == "success"){
            this.item_lists = result.data
            // console.log(JSON.stringify(this.item_lists))
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
          console.log(error)
        }
      )
    },
    selectItem (item) {
      this.CSItem()
      this.detailItemlist(item)
    },
    calExpDate (addDay) {
      var d = new Date()
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth() + 1
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth-1)
      }
      var mkDay = d.getDate();
      mkDay = new String(mkDay)
      if (mkDay.length == 1) {
        mkDay = "0" + mkDay
      }
      var mkYear = d.getFullYear()
      this.ExpDate = moment(new Date(mkYear, mkMonth, mkDay)).format('MM/DD/YYYY')
    },
    calDeliDate (addDay) {
      var d = new Date()
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth() + 1
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth-1)
      }
      var mkDay = d.getDate();
      mkDay = new String(mkDay)
      if (mkDay.length == 1) {
        mkDay = "0" + mkDay
      }
      var mkYear = d.getFullYear()
      this.deliveryDate = moment(new Date(mkYear, mkMonth, mkDay)).format('MM/DD/YYYY')
    },
    calExpDay (date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date()
      var secondDate = date
      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
      this.expDay = diffDays
    },
    calDeliDay (date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date()
      var secondDate = date
      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
      this.sendDay = diffDays
    },
    GenDocNo (tableName, billType) {
      $("#loading").addClass('is-active')
      api.gen_docNOAX(tableName, billType,
        (result) => {          
          $("#loading").removeClass('is-active')
          this.DocNo = result.data.new_doc_no
          this.DocDate = moment(this.toDate).format('MM/DD/YYYY')
          this.calExpDate(this.expDay)
          this.calDeliDate(this.sendDay)
          this.nowDate = {
              to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
          console.log(error)
        }
      )
    },
    detailItemlist (item) {
      console.log(item)
      this.detail_itemlists = []
    }
  },
  mounted () {
    this.params = this.$route.params.status
    this.GenDocNo('QT',0)
    this.toDay()
    moment.locale()
  }
}