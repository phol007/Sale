import api from '../../service/services.js'
import moment from 'moment'
import numeral from 'numeral'
import $ from 'jquery'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'Qtd',
  data() {
    return {
      user: '',
      usercode: '',
      params: [],
      DocID: 0,
      DocNo: '',
      vatType: 2,
      billType: 1,
      isConditionSend: 0,
      DocDate: '',
      nowDate: {},
      nowDocDate: {},
      disabled: false,
      docdata_disabled: false,
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
      ArDetail: '',
      ArCode: '',
      ArName: '',
      employee_lists: [],
      moSemp: '',
      EmpID: '',
      EmpCode: '',
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
      billnetAmount: 0,
      discription1: '',
      discription2: '',
      custo_assert: 1,
      dueDate: '',
      beforeNetAmount: 0,
      test: '',
      tool_menu: [],
      is_cancel: 0,
      is_confirm: 0,
      is_docNew: 0,
      check_price: '',
      price_lists: [],
      item_selected: '',
      stock_detail: '',
      weight_all: 0,
      permission: []
    }
  },
  components: {
    Datepicker
  },
  methods: {
    taphold(index) {
      this.hold = 0
      this.test = setInterval(function() {
        this.hold += 1
        if (this.hold == 3) {
          this.delete_item(index)
          this.holdover()
        }
      }.bind(this), 500);
    },
    holdover() {
      clearInterval(this.test)
    },
    SearchItem() {
      if (this.ArName) {
        if (this.detail_itemlists.length == 0) {
          swal({
              title: "แจ้งเตือน !",
              text: "กรุณาตรวจสอบประเภทภาษี, ประเภทการขาย, ประเภทการขนส่งและลูกหนี้ให้เรียบร้อย เมื่อเพิ่มจำนวนสินค้าแล้วจะไม่สามารถเปลี่ยนแปลงข้อมูลขั้นต้นได้ ท่านต้องการดำเนินการต่อหรือไม่ >-<! ",
              type: "info",
              showCancelButton: true,
              closeOnConfirm: true,
              showLoaderOnConfirm: true,
            },
            function(isConfirm) {
              if(isConfirm){
                $('#SItem').addClass('is-active')
                this.moSitem = ''
                this.searchItems(this.moSitem)              
              }
            }.bind(this))
        } else {
          $('#SItem').addClass('is-active')
          this.moSitem = ''
          this.searchItems(this.moSitem)
        }
      } else {
        swal({
          title: "แจ้งเตือน",
          text: "กรุณาเลือกลูกหนี้ให้เรียบร้อย",
          timer: 1000,
          type: "warning",
          showConfirmButton: false
        })
      }
    },
    CSItem() {
      $('#SItem').removeClass('is-active')
    },
    SearchCusto() {
      $('#SCusto').addClass('is-active')
      this.moScus = ''
      this.searchCus(this.moScus)
    },
    CSCusto() {
      $('#SCusto').removeClass('is-active')
    },
    SearchEmplo() {
      $('#SEmplo').addClass('is-active')
      this.moSemp = ''
      this.searchEmp(this.moSemp)
    },
    CSEmplo() {
      $('#SEmplo').removeClass('is-active')
    },
    goTo(page) {
      if (this.detail_itemlists.length == 0) {
        this.$router.push(page)
      } else {
        swal({
            title: "แจ้งเตือน",
            text: "เอกสารนี้มีสินค้าอยู่ ท่านต้องการดำเนินการต่อหรือไม่",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK",
            closeOnConfirm: true
          },
          function() {
            this.$router.push(page)
          }.bind(this))
      }
    },
    toDay() {
      var day = new Date()
      var d = day.getDate()
      var m = day.getMonth()
      var y = day.getFullYear()
      this.toDate = new Date(y, m, d)

      this.DocDate = moment(this.toDate).format('MM/DD/YYYY')
      this.calExpDate(this.expDay)
      this.calDeliDate(this.sendDay)
      this.calDueDate(0)
    },
    searchCus(keyword) {
      $("#loading").addClass('is-active')
      api.searchArAX(keyword,
        (result) => {
          $("#loading").removeClass('is-active')
          if (result.status == "success") {
            this.customer_lists = result.data
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          console.log(error)
        })
    },
    selectCus(CusD) {
      this.CSCusto()
      this.ArCode = CusD.ar_code
      this.ArDetail = CusD
      this.ArName = CusD.ar_name
      this.calDueDate(CusD.credit_day)
      this.creditDay = CusD.credit_day
    },
    searchEmp(keyword) {
      $("#loading").addClass('is-active')
      api.searchEmpAX(keyword, (result) => {
          $("#loading").removeClass('is-active')
          if (result.status == "success") {
            this.employee_lists = result.data
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          console.log(error)
        })
    },
    selectEmp(EmpD) {
      this.CSEmplo()
      this.EmpID = EmpD.id
      this.EmpCode = EmpD.sale_code
      this.EmpName = EmpD.sale_name
    },
    searchItems(keyword) {
      // console.log (this.billType)
      // console.log (this.ArID)
      // console.log (this.isConditionSend)
      $("#loading").addClass('is-active')
      api.searchItemAX(keyword, this.billType-1, this.ArID, this.isConditionSend, this.vatType-1,
        (result) => {
          $("#loading").removeClass('is-active')
          if (result.status == "success") {
            this.item_lists = result.data
            // console.log (JSON.stringify (this.item_lists))
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
          console.log(error)
        }
      )
    },
    return_price(units) {
      if (units == null) {
        return 'ไม่ได้ผูกราคา'
      } else {
        return units[0].price
      }
    },
    selectItem(item) {
      if (item.units == null) {
        swal({
          title: "แจ้งเตือน",
          text: "ไม่มีหน่วยนับ !!",
          timer: 1000,
          type: "warning",
          showConfirmButton: false
        })
      } else {
        this.CSItem()
        this.detailItemlist(item)
      }
    },
    setDocDate (date) {
      this.DocDate = date
      this.nowDocDate = {
           to: new Date(date)
      }
      this.calExpDate(this.expDay)
      this.calDeliDate(this.sendDay)
      this.calDueDate(this.creditDay)
    },
    calExpDate(addDay) {
      var d = new Date(this.DocDate)
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth()
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth)
      }
      var mkDay = d.getDate();
      mkDay = new String(mkDay)
      if (mkDay.length == 1) {
        mkDay = "0" + mkDay
      }
      var mkYear = d.getFullYear()
      this.ExpDate = moment(new Date(mkYear, mkMonth, mkDay)).format('MM/DD/YYYY')
    },
    calDeliDate(addDay) {
      var d = new Date(this.DocDate)
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth()
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth)
      }
      var mkDay = d.getDate();
      mkDay = new String(mkDay)
      if (mkDay.length == 1) {
        mkDay = "0" + mkDay
      }
      var mkYear = d.getFullYear()
      this.deliveryDate = moment(new Date(mkYear, mkMonth, mkDay)).format('MM/DD/YYYY')
    },
    calDueDate(addDay) {
      var d = new Date(this.DocDate)
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth()
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth)
      }
      var mkDay = d.getDate();
      mkDay = new String(mkDay)
      if (mkDay.length == 1) {
        mkDay = "0" + mkDay
      }
      var mkYear = d.getFullYear()
      this.dueDate = moment(new Date(mkYear, mkMonth, mkDay)).format('MM/DD/YYYY')
    },
    calExpDay(date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date(this.DocDate)
      var secondDate = date
      var difference = firstDate.getTime() - secondDate.getTime()
      var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
      this.expDay = Math.abs(daysDifference)
    },
    calDeliDay(date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date(this.DocDate)
      var secondDate = date
      var difference = firstDate.getTime() - secondDate.getTime()
      var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
      this.sendDay = Math.abs(daysDifference)
    },
    calcreditDay(date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date(this.DocDate)
      var secondDate = date
      // var diffDays = Math.floor(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
      var difference = firstDate.getTime() - secondDate.getTime()
      // แปลงเป็นวัน ชม. นาที วินาที
      var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
      this.creditDay = Math.abs(daysDifference)
    },
    formatMoney(int) {
      return numeral(int).format('0,0.00')
    },
    numberInt(str) {
      return numeral(str).value()
    },
    return_Int_Discount(str) { 
      if (typeof str == 'string') {
        if (str.includes("%") === true) {
          this.billDiscount = numeral(this.numberInt(str)).format('(0.0%)')
        } else {
          this.billDiscount = this.numberInt(str)
        }
      }
    },
    return_FM_Discount(int) {
      if (typeof int == 'string') {
        if (int.includes("%") === true) {
          this.billDiscount = numeral(this.numberInt(int)).format('(0.0%)')
        } else {
          this.billDiscount = this.formatMoney(int)
        }
      } else {
        if (int > 0) {
          this.billDiscount = numeral(this.numberInt(int)).format('0,0.00')
        } else {
          this.billDiscount = this.formatMoney(int)
        }
      }
    },
    return_Int_Item(lineNumber, cnt, price, discount) {
      for (var i = 0; i < this.detail_itemlists.length; i++) {
        if (i == lineNumber) {
          if (cnt != '') {
            this.detail_itemlists[i].qty = this.numberInt(cnt)
          }
          if (price != '') {
            this.detail_itemlists[i].price = this.numberInt(price)
          }
          if (discount != '') {
            if (typeof discount == 'string') {
              if (discount.includes("%") === true) {
                discount = numeral(this.numberInt(discount)).format('(0.0%)')
              } else {
                discount = this.numberInt(discount)
              }
            } else {
              discount = this.numberInt(discount)
            }
            this.detail_itemlists[i].discount = discount
          }
        }
      }
    },
    return_FM_Item(lineNumber, cnt, price, discount) {

      for (var i = 0; i < this.detail_itemlists.length; i++) {
        if (i == lineNumber) {
          if (cnt != '') {
            this.detail_itemlists[i].qty = this.formatMoney(cnt)
          }

          if (price != '') {
            this.detail_itemlists[i].price = this.formatMoney(price)
          }

          if (discount != '' || discount != '0') {
            // console.log(this.numberInt(discount))
            if (typeof discount == 'string') {
              if (discount.includes("%") === true) {
                discount = numeral(this.numberInt(discount)).format('(0.0%)')
              } else {
                discount = this.formatMoney(discount)
              }
            } else {
              discount = this.formatMoney(discount)
            }
            this.detail_itemlists[i].discount = discount
          } else {
            discount = this.formatMoney(discount)
            this.detail_itemlists[i].discount = discount
          }
        }
      }
    },
    return_date(str) {
      var date = str.split("/")
      var m = date[0]
      var d = date[1]
      var y = date[2]
      return y + '/' + m + '/' + d
    },
    calNetAmount(lineNumber, unit, cnt, price, discount, itemAmount) {
      //alert ('lineNumber = '+lineNumber+', unit = '+unit+', cnt = '+cnt+', price = '+price+', discount = '+discount)
      this.item_selected = ''
      this.stock_detail = ''
      if (price == '') {
        price = unit.price
      }
      console.log(this.numberInt(discount) + ", " + this.numberInt(itemAmount))
      if (this.numberInt(discount) <= this.numberInt(itemAmount)) {
        var data = this.detail_itemlists
        if (discount.includes("%") === true) {
          discount = numeral(this.numberInt(discount)).format('(0.0%)')
        } else {
          discount = this.formatMoney(discount)
        }
        if (parseInt(this.vatType) == 2) {
          this.taxRage = 7
          // console.log(true)
          var netAmountItem = ((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount)) - (((((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount)) * 100) / (this.taxRage + 100)))
          netAmountItem = this.formatMoney(this.numberInt(cnt) * this.numberInt(price) - netAmountItem)
        } else {
          var netAmountItem = this.formatMoney(this.numberInt(cnt) * this.numberInt(price))
        }

        for (var i = 0; i < this.detail_itemlists.length; i++) {
          if (i == lineNumber - 1) {
            data[i].unit = unit
            data[i].qty = this.formatMoney(this.numberInt(cnt))
            data[i].price = this.formatMoney(this.numberInt(price))
            data[i].discount = discount
            data[i].amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount))
            data[i].netAmountItem = this.numberInt(netAmountItem)
            data[i].home_amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount))
            // data[i].weight = this.numberInt(cnt) * data[i].weight
          }
        }
        this.calVatnetAmount()
      } else {
        // alert("ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า")
        swal("แจ้งเตือน", "ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า", "warning")
        this.detail_itemlists[lineNumber - 1].discount = this.formatMoney(0)
      }
    },
    GenDocNo(tableName, billType) {
      $("#loading").addClass('is-active')
      api.gen_docNOAX(tableName, billType,
        (result) => {
          $("#loading").removeClass('is-active')
          this.DocNo = result.data.new_doc_no
          this.insert_QT()
        },
        (error) => {
          $("#loading").removeClass('is-active')
          swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
          console.log(error)
        }
      )
    },
    detailItemlist(item) {
      var copy = false
      if(this.detail_itemlists.length != 0){
        for(var k = 0; k < this.detail_itemlists.length; k++){
          if(this.detail_itemlists[k].item_id == item.id){
            swal({
              title: "เพิ่มสินค้า",
              text: "สินค้านี้มีอยู่ในรายการแล้ว ท่านต้องการเพิ่มสินค้านี้ อีกหรือไม่ ?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "ตกลง",
              cancelButtonText: "ยกเลิก",
              closeOnConfirm: true,
              closeOnCancel: true
            },
            function(isConfirm) {
              if (isConfirm) {      
                if (parseInt(this.vatType) == 2) {
                  this.taxRage = 7
                  var netAmountItem = this.formatMoney(((1 * item.units[0].price) - this.numberInt(0)) - ((((1 * item.units[0].price) - this.numberInt(0)) * 100) / (this.taxRage + 100)))
                } else {
                  var netAmountItem = this.formatMoney(1 * item.units[0].price)
                }
                  this.detail_itemlists.push({
                    no: this.detail_itemlists.length + 1,
                    item_id: item.id,
                    item_code: item.item_code,
                    item_name: item.item_name,
                    units: item.units,
                    unit_select: item.units[0],
                    stock_select: item.stock_list[0],
                    qty: this.formatMoney(1),
                    price: this.formatMoney(item.units[0].price),
                    discount: this.formatMoney(0),
                    amount: this.formatMoney(1 * item.units[0].price),
                    netAmountItem: netAmountItem, // ลบอัตราภาษีมูลค่าเพิ่มของสินค้า
                    home_amount: this.formatMoney(1 * item.units[0].price),
                    stock_list: item.stock_list,
                    ref_no: this.DocNo,
                    weight: item.weight
                  })
                  this.calVatnetAmount()
              } else {

              }
            }.bind(this))
          }else{
            if(k == this.detail_itemlists.length-1){
              // alert(true)
              if (parseInt(this.vatType) == 2) {
                this.taxRage = 7
                var netAmountItem = this.formatMoney(((1 * item.units[0].price) - this.numberInt(0)) - ((((1 * item.units[0].price) - this.numberInt(0)) * 100) / (this.taxRage + 100)))
              } else {
                var netAmountItem = this.formatMoney(1 * item.units[0].price)
              }
                this.detail_itemlists.push({
                  no: this.detail_itemlists.length + 1,
                  item_id: item.id,
                  item_code: item.item_code,
                  item_name: item.item_name,
                  units: item.units,
                  unit_select: item.units[0],
                  stock_select: item.stock_list[0],
                  qty: this.formatMoney(1),
                  price: this.formatMoney(item.units[0].price),
                  discount: this.formatMoney(0),
                  amount: this.formatMoney(1 * item.units[0].price),
                  netAmountItem: netAmountItem, // ลบอัตราภาษีมูลค่าเพิ่มของสินค้า
                  home_amount: this.formatMoney(1 * item.units[0].price),
                  stock_list: item.stock_list,
                  ref_no: this.DocNo,
                  weight: item.weight
                })
                this.calVatnetAmount()
                k = this.detail_itemlists.length
            }
          }
        }
      }else{
        if (parseInt(this.vatType) == 2) {
          this.taxRage = 7
          var netAmountItem = this.formatMoney(((1 * item.units[0].price) - this.numberInt(0)) - ((((1 * item.units[0].price) - this.numberInt(0)) * 100) / (this.taxRage + 100)))
        } else {
          var netAmountItem = this.formatMoney(1 * item.units[0].price)
        }
          this.detail_itemlists.push({
            no: this.detail_itemlists.length + 1,
            item_id: item.id,
            item_code: item.item_code,
            item_name: item.item_name,
            units: item.units,
            unit_select: item.units[0],
            stock_select: item.stock_list[0],
            qty: this.formatMoney(1),
            price: this.formatMoney(item.units[0].price),
            discount: this.formatMoney(0),
            amount: this.formatMoney(1 * item.units[0].price),
            netAmountItem: netAmountItem, // ลบอัตราภาษีมูลค่าเพิ่มของสินค้า
            home_amount: this.formatMoney(1 * item.units[0].price),
            stock_list: item.stock_list,
            ref_no: this.DocNo,
            weight: item.weight
          })
          this.calVatnetAmount()
      }
    },
    delete_item(index) {
      if(this.is_confirm==1||this.is_cancel==1){

      }else{
        swal({
            title: "ลบรายการสินค้า",
            text: "ท่านต้องการลบรายการสินค้าที่เลือกหรือไม่",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
            closeOnConfirm: false,
            closeOnCancel: true
          },
          function(isConfirm) {
            if (isConfirm) {
              this.detail_itemlists.splice(index, 1)
              for (var i = 0; i < this.detail_itemlists.length; i++) {
                this.detail_itemlists[i].no = i + 1
              }
              this.hold = 0
              this.calVatnetAmount()
              swal({
                title: "Deleted!",
                text: "ลบสินค้าเรียบร้อยแล้ว",
                timer: 1000,
                type: "success",
                showConfirmButton: false
              })
            } else {

            }
          }.bind(this))
      }
    },
    calVatnetAmount() {
      // console.log (this.vatType)
      // alert(this.numberInt(this.billDiscount))
      if(this.numberInt(this.billDiscount)<0){
        swal("Warning !!", "ส่วนลดต้องไม่น้อยกว่า 0", "warning")
        this.billDiscount = this.formatMoney(0)
        this.calVatnetAmount()
      }else{
        if(this.vatType==3){
          this.taxRage = 0
        }else{
          this.taxRage = 7          
        }
        this.weight_all = this.calweight_all(this.detail_itemlists)
        var sumTotal = this.sumTotal_item(this.detail_itemlists)
        this.netVatAmount = this.Case_netVatAmount(parseInt(this.vatType), sumTotal, this.billDiscount, this.taxRage)
        this.totalItemAmount = this.formatMoney(sumTotal)
        this.billnetAmount = this.Case_billnetAmount(parseInt(this.vatType), this.netVatAmount, sumTotal, this.billDiscount)
        if (this.billDiscount.includes("%") === true) {
          this.billDiscount = this.billDiscount
        } else {
          this.billDiscount = this.formatMoney(this.billDiscount)
        }
        this.beforeNetAmount = this.Case_beforNetAmount(parseInt(this.vatType), this.billnetAmount, this.netVatAmount, this.totalItemAmount)
        var calDiscount = this.Case_checkbillDiscount(parseInt(this.vatType), this.billDiscount, this.billnetAmount, sumTotal)
        if(calDiscount == true){
          swal('Warning !!', 'ท่านใส่ส่วนลดมากเกินไป', 'warning')
          this.billDiscount = this.formatMoney(0)
          this.calVatnetAmount()
        }
      }
    },
    insert_QT() {
      $("#loading").addClass('is-active')
      var sumTotal = 0
      for (var i = 0; i < this.detail_itemlists.length; i++) {
        sumTotal += this.numberInt(this.detail_itemlists[i].amount)
      }
      var item_Sub = []
      var DocNo = this.DocNo

      this.detail_itemlists.forEach(function(val, key) {
        item_Sub.push({
          item_id: val['item_id'],
          item_code: val['item_code'],
          item_name: val['item_name'],
          qty: numeral(val['qty']).value(),
          price: numeral(val['price']).value(),
          dis_count_word_sub: val['discount'],
          dis_count_amount_sub: numeral(val['discount']).value(),
          unit_code: val['unit_select']['unit_code'],
          item_amount: numeral(val['amount']).value(),
          item_description: '',
          line_number: val['no']
        })
      })

      var obj = {
        doc_no: this.DocNo,
        doc_date: '',
        ar_id: this.ArDetail.id,
        ar_code: this.ArCode,
        ar_name: this.ArName,
        ar_bill_address: this.ArDetail.address,
        ar_telephone: this.ArDetail.ar_telephone,
        sale_id: parseInt(this.EmpID),
        sale_code: this.EmpCode.toString(),
        sale_name: this.EmpName,
        ref_no: '',
        tax_type: this.vatType-1,
        credit_day: this.numberInt(this.creditDay),
        due_date: this.return_date(this.dueDate),
        delivery_day: this.numberInt(this.sendDay),
        delivery_date: this.return_date(this.deliveryDate),
        expire_day: this.numberInt(this.expDay),
        expire_date: this.return_date(this.ExpDate),
        contract_id: 0,
        is_condition_send: this.isConditionSend,
        my_description: this.discription1 + '|' + this.discription2,
        sum_item_amount: sumTotal,
        dis_count_word: this.billDiscount,
        dis_count_amount: this.numberInt(this.billDiscount),
        after_discount_amount: this.numberInt(this.totalItemAmount) - this.numberInt(this.billDiscount), // ลบส่วนลดท้ายบิล
        before_tax_amount: this.beforeNetAmount, // ถอด vat 7% รวมใน
        tax_amount: this.numberInt(this.netVatAmount),
        total_amount: this.billnetAmount,
        approve_id: 0,
        project_id: 0,
        allocate_id: 0,
        creator_code: this.usercode,
        create_date_time: '',
        bill_type: this.billType-1,
        validity: this.numberInt(this.sendpriceDay),
        customer_assert: this.numberInt(this.custo_assert),
        subs: item_Sub
      }
      // console.log(item_Sub)
      console.log('insert = '+JSON.stringify(obj))
      if (this.EmpCode != '' && this.detail_itemlists.length != 0) {
        api.insertQTAX(obj,
          (result) => {
            // alert("บันทึกเรียบร้อยเอกสารเลขที่ " + this.DocNo + " เรียบร้อยแล้ว")
            swal("แจ้งเตือน", "บันทึกเรียบร้อยเอกสารเลขที่ " + this.DocNo + " เรียบร้อยแล้ว", "success")
            this.$router.push('/Saleh')
          },
          (error) => {
            $("#loading").removeClass('is-active')
            swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
            console.log(error)
          }
        )
      } else {
        if (this.EmpCode == '') {
          swal({
            title: "แจ้งเตือน",
            text: "กรุณาเลือกพนักงานขาย",
            timer: 1000,
            type: "warning",
            showConfirmButton: false
          })
          $("#loading").removeClass('is-active')
          this.SearchEmplo()
        } else {
          $("#loading").removeClass('is-active')
          swal({
              title: "แจ้งเตือน",
              text: "เอกสารนี้ ไม่มีรายการสินค้า",
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              closeOnConfirm: false
            },
            function() {
              this.SearchItem()
            }.bind(this))
        }
      }
    },
    update_QT() {
      $("#loading").addClass('is-active')
      this.permission.forEach(function(val, key){
        if(val['menuid']==1){
          if(val['is_update'] == 1){
            var sumTotal = 0
            for (var i = 0; i < this.detail_itemlists.length; i++) {
              sumTotal += this.numberInt(this.detail_itemlists[i].amount)
            }
            var item_Sub = []
            var DocNo = this.DocNo

            this.detail_itemlists.forEach(function(val, key) {

              item_Sub.push({
                item_id: val['item_id'],
                item_code: val['item_code'],
                item_name: val['item_name'],
                qty: numeral(val['qty']).value(),
                price: numeral(val['price']).value(),
                dis_count_word_sub: val['discount'],
                dis_count_amount_sub: numeral(val['discount']).value(),
                unit_code: val['unit_select']['unit_code'],
                item_amount: numeral(val['amount']).value(),
                item_description: '',
                line_number: val['no']
              })

            })

            var obj = {
              id: this.DocID,
              doc_no: this.DocNo,
              doc_date: '',
              ar_id: this.ArDetail.id,
              ar_code: this.ArCode,
              ar_name: this.ArName,
              ar_bill_address: this.ArDetail.address,
              ar_telephone: this.ArDetail.ar_telephone,
              sale_id: parseInt(this.EmpID),
              sale_code: this.EmpCode.toString(),
              sale_name: this.EmpName,
              ref_no: '',
              tax_type: this.vatType-1,
              credit_day: this.creditDay,
              due_date: moment(this.dueDate).format("YYYY/MM/DD"),
              delivery_day: this.sendDay,
              delivery_date: moment(this.deliveryDate).format("YYYY/MM/DD"),
              expire_day: this.expDay,
              expire_date: moment(this.ExpDate).format("YYYY/MM/DD"),
              contract_id: 0,
              is_condition_send: this.isConditionSend,
              my_description: this.discription1 + '|' + this.discription2,
              sum_item_amount: sumTotal,
              dis_count_word: this.billDiscount,
              dis_count_amount: this.numberInt(this.billDiscount),
              after_discount_amount: this.numberInt(this.totalItemAmount) - this.numberInt(this.billDiscount), // ลบส่วนลดท้ายบิล
              before_tax_amount: this.beforeNetAmount, // ถอด vat 7% รวมใน
              tax_amount: this.numberInt(this.netVatAmount),
              total_amount: this.billnetAmount,
              approve_id: 0,
              project_id: 0,
              allocate_id: 0,
              creator_code: this.usercode,
              create_date_time: '',
              bill_type: this.billType-1,
              validity: this.sendpriceDay,
              customer_assert: this.numberInt(this.custo_assert),
              subs: item_Sub
            }
            // console.log(item_Sub)
            console.log('update = '+JSON.stringify(obj))
            if (this.EmpCode != '' && this.detail_itemlists.length != 0) {
              api.updateQTAX(obj,
                (result) => {
                  // alert("บันทึกเรียบร้อยเอกสารเลขที่ " + this.DocNo + " เรียบร้อยแล้ว")
                  swal("แจ้งเตือน", "บันทึกเรียบร้อยเอกสารเลขที่ " + this.DocNo + " เรียบร้อยแล้ว", "success")
                  this.$router.push('/Saleh')
                },
                (error) => {
                  $("#loading").removeClass('is-active')
                  swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
                  console.log(error)
                }
              )
            } else {
              if (this.EmpCode == '') {
                swal({
                  title: "แจ้งเตือน",
                  text: "กรุณาเลือกพนักงานขาย",
                  timer: 1000,
                  type: "warning",
                  showConfirmButton: false
                })
                $("#loading").removeClass('is-active')
                this.SearchEmplo()
              } else {
                $("#loading").removeClass('is-active')
                swal({
                    title: "แจ้งเตือน",
                    text: "เอกสารนี้ ไม่มีรายการสินค้า",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                  },
                  function() {
                    this.SearchItem()
                  }.bind(this))
              }
            }
        }else{
            swal({
                title: "แจ้งเตือน",
                text: "ท่านไม่มีสิทธิเข้าถึงรายละเอียดของเอกสารนี้",
                timer: 1000,
                type: "warning",
                showConfirmButton: false
              })
          }
        }
      }.bind(this))
    },
    showDetail_QT(doc_no) {
      $("#loading").addClass('is-active')
      this.detail_itemlists = []
      api.detailQTAX(doc_no,
        (result) => {
          console.log('Detail = '+JSON.stringify(result.data))
          $("#loading").removeClass('is-active')
          this.DocID = result.data.id
          this.DocNo = result.data.doc_no
          this.vatType = result.data.tax_type+1
          this.billType = result.data.bill_type+1
          this.ArCode = result.data.ar_code
          this.ArName = result.data.ar_name
          this.DocDate = new Date(result.data.doc_date)
          this.nowDate = {
            to: new Date(result.data.doc_date)
          }

          this.EmpID = result.data.sale_id
          this.EmpCode = result.data.sale_code
          this.EmpName = result.data.sale_name

          var discript = result.data.my_description
          if (discript != "") {
            var dis = discript.split('|')
            this.discription1 = dis[0]
            this.discription2 = dis[1]
          }

          this.sendpriceDay = result.data.validity
         // this.reciveDay = ''
          this.expDay = result.data.expire_day
          this.sendDay = result.data.delivery_day
          this.creditDay = result.data.credit_day
          this.isConditionSend = result.data.is_condition_send
          this.custo_assert = result.data.customer_assert

          this.ExpDate = new Date(result.data.expire_date)
          this.deliveryDate = new Date(result.data.delivery_date)
          this.dueDate = new Date(result.data.due_date)

          this.totalItemAmount = this.formatMoney(result.data.sum_item_amount)
          this.billDiscount = this.formatMoney(result.data.dis_count_word)
          this.netVatAmount = this.formatMoney(result.data.tax_amount)
          this.is_cancel = result.data.is_cancel
          this.is_confirm = result.data.is_confirm

          this.setMenuTool(1)     

          result.data.subs.forEach(function(val, key) {
            if (parseInt(this.vatType) == 2) {
              this.taxRage = 7
              var netAmountItem = this.formatMoney(((1 * val['price']) - this.numberInt(val['dis_count_word_sub'])) - ((((1 * val['price']) - this.numberInt(val['dis_count_word_sub'])) * 100) / (this.taxRage + 100)))
            } else {
              var netAmountItem = this.formatMoney(1 * val['price'])
            }

            var units = []
            var unit_select = 0
            var stock = []

            api.searchUnitAX(val['item_code'], this.billType, this.ArID, this.isConditionSend, this.vatType,
              (result) => {
                units = result.units
                stock = result.stock_list
                for (var r = 0; r < units.length; r++) {
                  if (units[r].unit_code == val['unit_code']) {
                    unit_select = units[r]
                  }
                }
                this.detail_itemlists.push({
                  no: val['line_number'],
                  item_id: val['item_id'],
                  item_code: val['item_code'],
                  item_name: val['item_name'],
                  units: units,
                  unit_select: unit_select,
                  stock_select: '',
                  qty: this.formatMoney(val['qty']),
                  price: this.formatMoney(val['price']),
                  discount: val['dis_count_word_sub'],
                  amount: this.formatMoney(val['item_amount']),
                  netAmountItem: netAmountItem, // ลบอัตราภาษีมูลค่าเพิ่มของสินค้า
                  home_amount: val['item_amount'],
                  stock_list: stock,
                  ref_no: this.DocNo,
                  weight: result.weight
                })
              },
              (error) => {
                $("#loading").removeClass('is-active')
                swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
                console.log(error)
              }
            )
          }.bind(this))
          setTimeout(function() {
            this.calVatnetAmount()
          }.bind(this), 1000)
        },
        (error) => {
          $("#loading").removeClass('is-active')
          swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
          console.log(error)
        }
      )
    },
    setMenuTool (status) {
      if(status==0){
        this.tool_menu = [
                        {
                          text: 'ย้อนกลับ',
                          icon: 'fa fa-chevron-left',
                          func: 1
                        },
                        {
                          text: 'บันทึกเอกสาร',
                          icon: 'fa fa-pencil-square-o',
                          func: 3
                        },
                        {
                          text: 'คู่มือใช้',
                          icon: 'fa fa-question',
                          func: 2
                        }
                        ]
      }else if (status==1) {
        if(this.is_confirm==0&&this.is_cancel==0){
          this.tool_menu = [
                            {
                              text: 'ย้อนกลับ',
                              icon: 'fa fa-chevron-left',
                              func: 1
                            },
                            {
                              text: 'บันทึกการแก้ไขเอกสาร',
                              icon: 'fa fa-pencil-square-o',
                              func: 4
                            },
                            {
                              text: 'อนุมัติเอกสาร',
                              icon: 'fa fa-thumbs-o-up',
                              func: 5
                            },
                            {
                              text: 'คู่มือใช้งาน',
                              icon: 'fa fa-question',
                              func: 2
                            }
                          ]
        }else if(this.is_confirm==1){
          this.tool_menu = [
                            {
                              text: 'ย้อนกลับ',
                              icon: 'fa fa-chevron-left',
                              func: 1
                            },
                            {
                              text: 'ปรับเอกสารให้เป็นใบ BackOrder',
                              icon: 'fa fa-exchange',
                              func: 6
                            },
                            {
                              text: 'ปรับเอกสารให้เป็นใบสั่งขาย',
                              icon: 'fa fa-exchange',
                              func: 7
                            },
                            {
                              text: 'ปรับเอกสารให้เป็นใบใบสั่งจอง',
                              icon: 'fa fa-exchange',
                              func: 8
                            },
                            {
                              text: 'คู่มือใช้งาน',
                              icon: 'fa fa-question',
                              func: 2
                            }
                          ]
        }else{
           this.tool_menu = [
                            {
                              text: 'ย้อนกลับ',
                              icon: 'fa fa-chevron-left',
                              func: 1
                            },
                            {
                              text: 'คู่มือใช้งาน',
                              icon: 'fa fa-question',
                              func: 2
                            }
                          ]
        }
      }
    },
    funcMenu (type) {
      switch (type) {
        case 1: this.goTo("/Saleh")
          break
        case 2: alert("คู่มือใช้งานยังไม่ได้ทำครับ")
          break
        case 3: this.GenDocNo('QT', 0)
          break
        case 4: this.update_QT()
          break
        case 5: this.approve ()
          break
        case 6: alert('ไม่เปิดให้บริการครับ')// BO 
          break
        case 7: alert('ไม่เปิดให้บริการครับ')// SO
          break
        case 8: alert('ไม่เปิดให้บริการครับ')// RO
          break
      }
    },
    approve (data) {
      var body = {
                  id: this.DocID,
                  is_confirm: 1,
                  approve_id: this.user.id,
                  approve_code: this.user.usercode,
                  approve_date_time: ''
                }
      swal({
          title: "อนุมัติเอกสาร",
          text: "ท่านต้องการอนุมัติเอาสารใบนี้หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "ตกลง",
          cancelButtonText: "ปิด",
          closeOnConfirm: false
        },
        function () {
          $('#loading').addClass('is-active')
          api.approveQTAX(body,
            (result) => {
              //console.log(result.data)
              $('#loading').removeClass('is-active')
              swal({
                title: "Approve Quotation",
                text: "อนุมัติใบเสนอราคาเรียบร้อย",
                timer: 1000,
                type: "success",
                showConfirmButton: false
              })
              this.tool = false
              this.showDetail_QT(this.DocNo)
            },
            (error) => {
              this.tool = false
              $('#loading').removeClass('is-active')
              console.log(error)
            }
          )
        }.bind(this)
      )
    },
    selectTR (item_detail) {
      $("#loading").addClass('is-active')      
      $("#Price_item").addClass('is-active')
      this.price_lists = []
      api.searchUnitAX(item_detail.item_code, this.billType-1, this.ArID, this.isConditionSend, this.vatType-1,
        (result) => {
          $("#loading").removeClass('is-active')
          this.check_price = result.item_name
          result.price_list.forEach(function(val, key){
            if(val['sale_type']==0){
              val['sale_type'] = 'ขายสด'
            }else{
              val['sale_type'] = 'ขายเชื่อ'
            }

            if(val['tax_type']==0){
              val['tax_type'] = 'แยกนอก'
            }else{
              val['tax_type'] = 'รวมใน'
            }

            if(val['transport_type']==0){
              val['transport_type'] = 'รับเอง'
            }else{
              val['transport_type'] = 'ส่งให้'
            }
            this.price_lists.push({
              unit: val['unit'], 
              sale_type: val['sale_type'], 
              tax_type: val['tax_type'],
              price1: val['sale_price_1'],
              price2: val['sale_price_2'],
              price3: val['sale_price_3'],
              price4: val['sale_price_4'],
              transfer: val['transport_type'],
              qty: this.formatMoney(val['from_qty']) +' - '+ this.formatMoney(val['to_qty'])
            })
          }.bind(this))
        },
        (error) => {
          $("#loading").removeClass('is-active')
          swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
          console.log(error)
        }
      )
    },
    closeTR () {
      $('#Price_item').removeClass('is-active')
    },
    show_stock (index, item_detail) {
      this.item_selected = item_detail
      this.stock_detail = item_detail.stock_list
      var label_item = document.getElementsByClassName('item_list_label')
      var select_item = document.getElementsByClassName('item_list_select')
      var input1_item = document.getElementsByClassName('item_list_input1')
      var input2_item = document.getElementsByClassName('item_list_input2')
      var input3_item = document.getElementsByClassName('item_list_input3')
      var input4_item = document.getElementsByClassName('item_list_input4')
      for(var i = 0; i < select_item.length; i++){
        if(i == index){          
          label_item[i].style.backgroundColor  = '#f7f8f9'
          select_item[i].style.backgroundColor  = '#f7f8f9'
          input1_item[i].style.backgroundColor  = '#f7f8f9'
          input2_item[i].style.backgroundColor  = '#f7f8f9'
          input3_item[i].style.backgroundColor  = '#f7f8f9'
          input4_item[i].style.backgroundColor  = '#f7f8f9'
        }else{
          label_item[i].style.backgroundColor  = '#fff'
          select_item[i].style.backgroundColor  = '#fff'
          input1_item[i].style.backgroundColor  = '#fff'
          input2_item[i].style.backgroundColor  = '#fff'
          input3_item[i].style.backgroundColor  = '#fff'
          input4_item[i].style.backgroundColor  = '#fff'
        }
      }
    },
    keyInt (e) {      
      console.log(e.keyCode)
      if(e.keyCode!=190){
        if(e.keyCode!=9){
          if(e.keyCode!=13){
            if(e.keyCode!=8){
              if(e.keyCode<46||e.keyCode>57){
                e.returnValue = false
              }
            }
          }
        }
      }
      e.returnValue = true
    },
    keyNumber (e) {
      if(e.keyCode!=190){
        if(e.keyCode!=9){
          if(e.keyCode!=13){
            if(e.keyCode!=8){
              if(e.keyCode<46||e.keyCode>57){
                e.returnValue = false
              }
            }
          }
        }
      }      
      e.returnValue = true
    },
    sendpriceDay_lessone_day (day) {
      if(day < 1) {    
        swal({
          title: "แจ้งเตือน",
          text: "จำนวนวันต้องไม่น้อยกว่า 1 วัน",
          timer: 1000,
          type: "warning",
          showConfirmButton: false
        })
        this.sendpriceDay = 1
      }
    },
    expDay_lessone_day (day) {
      if(day < 1) { 
        swal({
          title: "แจ้งเตือน",
          text: "จำนวนวันต้องไม่น้อยกว่า 1 วัน",
          timer: 1000,
          type: "warning",
          showConfirmButton: false
        })   
        this.expDay = 1
        this.calExpDate(1)
      }else{
        this.calExpDate(day)
      }
    },
    sendDay_lessone_day (day) {
      if(day < 1) {    
        swal({
          title: "แจ้งเตือน",
          text: "จำนวนวันต้องไม่น้อยกว่า 1 วัน",
          timer: 1000,
          type: "warning",
          showConfirmButton: false
        })
        this.sendDay = 1
        this.calDeliDate(1)
      }else{
        this.calDeliDate(day)
      }
    }
  },
  beforeDestroy () {
    this.removeEventListener = null
  },
  computed: {
    sortedList() {
      return this.detail_itemlists.sort((a, b) => a.no < b.no ? -1 : a.no > b.no ? 1 : 0)
    }
  },
  mounted() {
    this.params = this.$route.params
    this.user = JSON.parse(localStorage.DataUser)
    this.usercode = this.user.usercode
    this.permission = this.user.menu
    moment.locale()

    if (this.params.status == 0) {
      // this.GenDocNo('QT', 0)  
      this.DocNo = 'ใบเสนอราคาใหม่'    
      this.calVatnetAmount()
      this.setMenuTool(0)
      this.nowDate = {
           to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      }
      this.toDay()      
    } else if (this.params.status == 1) {
      this.showDetail_QT(this.params.docno)
      this.docdata_disabled = false
    } else {
      this.$router.push('/Saleh')
      //console.log(this.$route.params.status)
    }
    document.addEventListener("keydown", (e) => {
      // alert(e.keyCode)
      if(e.keyCode == 113){
        if(this.item_selected!=''){
          this.selectTR(this.item_selected)
          return false
        }
      }
    })
  }
}
