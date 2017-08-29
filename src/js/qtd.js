import api from '../service/services.js'
import moment from 'moment'
import numeral from 'numeral'
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
      detail_itemlists: [],
      unit_list: '',
      qty: '',
      hold: 0,
      billDiscount: this.formatMoney(0),
      netVatAmount: this.formatMoney(0),
      totalItemAmount: this.formatMoney(0),
      billnetAmount: 0
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
        alert("กรุณาเลือกลูกหนี้ให้เรียบร้อย")
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
    return_price (units) {
      if(units==null){
        return 'ไม่ได้ผูกราคา'
      }else{
        return units[0].price
      }
    },
    selectItem (item) {
      if(item.units == null){
        alert('ไม่มีหน่วยนับ')
      }else{
        this.CSItem()
        this.detailItemlist(item)  
      }      
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
    formatMoney (int) {
      return numeral(int).format('0,0.00')
    },
    numberInt (str) {
      return numeral(str).value()
    },
    return_Int_Discount (str){
      this.billDiscount = this.numberInt(str)
    },
    return_FM_Discount (int) {
      this.billDiscount = this.formatMoney(int)
    },
    return_Int_Item (lineNumber, cnt, price, discount) {
      for(var i = 0; i < this.detail_itemlists.length; i++){
        if(i==lineNumber){
          if(cnt!=''){
            this.detail_itemlists[i].qty = this.numberInt(cnt)
          }
          if(price!=''){
            this.detail_itemlists[i].price = this.numberInt(price)
          }
          if(discount!=''){
            this.detail_itemlists[i].discount = this.numberInt(discount)
          }
        }
      }
    },
    return_FM_Item (lineNumber, cnt, price, discount) {
      for(var i = 0; i < this.detail_itemlists.length; i++){
        if(i==lineNumber){
          if(cnt!=''){
            this.detail_itemlists[i].qty = this.formatMoney(cnt)
          }
          if(price!=''){
            this.detail_itemlists[i].price = this.formatMoney(price)
          }
          if(discount!=''){
            this.detail_itemlists[i].discount = this.formatMoney(discount)
          }
        }
      }
    },
    calNetAmount (lineNumber, unit, cnt, price, discount, itemAmount) {
      //alert('lineNumber = '+lineNumber+', unit = '+unit+', cnt = '+cnt+', price = '+price+', discount = '+discount)
      if(price==''){
        price = unit.price
      }
      if(this.numberInt(discount) <= this.numberInt(itemAmount)){
        var data = this.detail_itemlists
        for (var i = 0; i < this.detail_itemlists.length; i++) {
          if(i==lineNumber-1){
            data[i].unit = unit
            data[i].qty = this.formatMoney(this.numberInt(cnt))
            data[i].price = this.formatMoney(this.numberInt(price))
            data[i].discount = this.formatMoney(discount)
            data[i].netAmountItem = this.formatMoney((this.numberInt(cnt)*this.numberInt(price))-this.numberInt(discount))
          }
        }
        this.calVatnetAmount()
      }else{
        alert("ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า")
        this.detail_itemlists[lineNumber-1].discount = this.formatMoney(0)
      }
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
          this.calVatnetAmount()
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
          console.log(error)
        }
      )
    },
    detailItemlist (item) {
      
      this.detail_itemlists.push(
      {
        no: this.detail_itemlists.length + 1,
        item_code: item.item_code,
        item_name: item.item_name,
        units: item.units,
        unit_select: item.units[0],
        qty: this.formatMoney(1),
        price: this.formatMoney(item.units[0].price),
        discount: this.formatMoney(0),
        netAmountItem: this.formatMoney(1*item.units[0].price),
        stock_list: item.stock_list
      }
      )
      this.calVatnetAmount()
    },
    delete_item (index) {
      this.hold++
      if(this.hold===2){
        this.detail_itemlists.splice(index, 1)
        for(var i = 0; i < this.detail_itemlists.length; i++){
          this.detail_itemlists[i].no = i+1
        }
        this.hold=0
        this.calVatnetAmount()
      }
      setTimeout(function() {
        this.hold=0
      }.bind(this), 700)     
    },
    calVatnetAmount () {
      var sumTotal = 0
      for(var i = 0; i < this.detail_itemlists.length; i++){
        sumTotal += this.numberInt(this.detail_itemlists[i].netAmountItem)
      }
      switch (this.vatType) {
        case 1 : // แยกนอก
                console.log("แยกนอก " + sumTotal)
                this.netVatAmount = this.formatMoney((sumTotal-this.numberInt(this.billDiscount))+(sumTotal * (this.taxRage/100)))
                this.totalItemAmount = this.formatMoney(sumTotal-this.numberInt(this.billDiscount))
                this.billnetAmount = this.numberInt(this.netVatAmount)
                this.billDiscount = this.formatMoney(this.billDiscount)
          break
        case 2 : // รวมใน
                console.log("รวมใน " + sumTotal)
          break
        case 3 : // อัตราศูนย์
                console.log("อัตราศูนย์ " + sumTotal)
          break
      }
    }
  },
  mounted () {
    this.params = this.$route.params.status
    this.GenDocNo('QT',0)
    this.toDay()
    moment.locale()
  }
}