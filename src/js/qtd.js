import api from '../service/services.js'
import moment from 'moment'
import numeral from 'numeral'
import $ from 'jquery'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'Qtd',
  data() {
    return {
      usercode: '',
      params: [],
      DocNo: '',
      vatType: 2,
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
      beforeNetAmount: 0
    }
  },
  components: {
    Datepicker
  },
  methods: {
    SearchItem() {
      if (this.ArName) {
        if(this.detail_itemlists.length==0){
          swal({
            title: "แจ้งเตือน !",
            text: "กรุณาตรวจสอบประเภทภาษี, ประเภทการขาย, ประเภทการขนส่งและลูกหนี้ให้เรียบร้อย เมื่อเพิ่มจำนวนสินค้าแล้วจะไม่สามารถเปลี่ยนแปลงข้อมูลขั้นต้นได้ ท่านต้องการดำเนินการต่อหรือไม่ >-<! ",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: true,
            showLoaderOnConfirm: true,
          },
          function(){
            $('#SItem').addClass('is-active')
            this.moSitem = ''
            this.searchItems(this.moSitem)
          }.bind(this))

        }else{
          $('#SItem').addClass('is-active')
          this.moSitem = ''
          this.searchItems(this.moSitem)
        }
      } else {
       swal("แจ้งเตือน", "กรุณาเลือกลูกหนี้ให้เรียบร้อย")
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
      if(this.detail_itemlists.length==0){
        this.$router.push(page)
      }else{
         swal({
            title: "แจ้งเตือน",
            text: "เอกสารนี้มีสินค้าอยู่ ท่านต้องการดำเนินการต่อหรือไม่",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK",
            closeOnConfirm: false
          },
          function(){
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
      this.EmpCode = EmpD.id
      this.EmpID = EmpD.sale_code
      this.EmpName = EmpD.sale_name
    },
    searchItems(keyword) {
      // console.log (this.billType)
      // console.log (this.ArID)
      // console.log (this.isConditionSend)
      $("#loading").addClass('is-active')
      api.searchItemAX(keyword, this.billType, this.ArID, this.isConditionSend,
        (result) => {
          $("#loading").removeClass('is-active')
          if (result.status == "success") {
            this.item_lists = result.data
            // console.log (JSON.stringify (this.item_lists))
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ ' + error)
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
        alert('ไม่มีหน่วยนับ')
      } else {
        this.CSItem()
        this.detailItemlist(item)
      }
    },
    calExpDate(addDay) {
      var d = new Date()
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth() + 1
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth - 1)
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
      var d = new Date()
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth() + 1
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth - 1)
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
      var d = new Date()
      d.setDate(d.getDate() + parseInt(addDay))
      var mkMonth = d.getMonth() + 1
      var mkMonth = new String(mkMonth)
      if (mkMonth.length == 1) {
        mkMonth = "0" + (mkMonth - 1)
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
      var firstDate = new Date()
      var secondDate = date
      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
      this.expDay = diffDays
    },
    calDeliDay(date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date()
      var secondDate = date
      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
      this.sendDay = diffDays
    },
    calcreditDay(date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date()
      var secondDate = date
      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
      this.creditDay = diffDays
    },
    formatMoney(int) {
      return numeral(int).format('0,0.00')
    },
    numberInt(str) {
      return numeral(str).value()
    },
    return_Int_Discount(str) {
      this.billDiscount = this.numberInt(str)
    },
    return_FM_Discount(int) {
      if (typeof int == 'string') {
        if (int.includes("%") === true) {
          this.billDiscount = numeral(this.numberInt(int)).format('0%')
        } else {
          this.billDiscount = this.formatMoney(int)
        }
      } else {
        if (int > 0) {
          this.billDiscount = numeral(this.numberInt(int)).format('0%')
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
                discount = numeral(this.numberInt(discount)).format('0%')
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
          if (discount != '') {
            // console.log(this.numberInt(discount))
            if (typeof discount == 'string') {
              if (discount.includes("%") === true) {
                discount = numeral(this.numberInt(discount)).format('0%')
              } else {
                discount = this.formatMoney(discount)
              }
            } else {
              discount = this.formatMoney(discount)
            }
            this.detail_itemlists[i].discount = discount
          }
        }
      }
    },
    return_date (str) {
      var date = str.split("/")
      var m = date[0]
      var d = date[1]
      var y = date[2]
      return y+'/'+m+'/'+d
    },
    calNetAmount(lineNumber, unit, cnt, price, discount, itemAmount) {
      //alert ('lineNumber = '+lineNumber+', unit = '+unit+', cnt = '+cnt+', price = '+price+', discount = '+discount)
      if (price == '') {
        price = unit.price
      }
      console.log(this.numberInt(discount)+", "+this.numberInt(itemAmount))
      if (this.numberInt(discount) <= this.numberInt(itemAmount)) {
        var data = this.detail_itemlists
        if (discount.includes("%") === true) {
          discount = numeral(this.numberInt(discount)).format('0%')
        } else {
          discount = this.formatMoney(discount)
        }
        if(parseInt(this.vatType)==2){
          this.taxRage = 7
          // console.log(true)
          var netAmountItem = ((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount)) - (((((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount)) * 100) / (this.taxRage + 100)))
          netAmountItem = this.formatMoney(this.numberInt(cnt) * this.numberInt(price) -netAmountItem)
        }else{
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
          }
        }
        console.log(this.detail_itemlists)
        this.calVatnetAmount()
      } else {
        alert("ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า")
        this.detail_itemlists[lineNumber - 1].discount = this.formatMoney(0)
      }
    },
    GenDocNo(tableName, billType) {
      $("#loading").addClass('is-active')
      api.gen_docNOAX(tableName, billType,
        (result) => {
          $("#loading").removeClass('is-active')
          this.DocNo = result.data.new_doc_no
          this.DocDate = moment(this.toDate).format('MM/DD/YYYY')
          this.calExpDate(this.expDay)
          this.calDeliDate(this.sendDay)
          this.calDueDate(0)
          this.nowDate = {
            to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          }
          this.calVatnetAmount()
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ ' + error)
          console.log(error)
        }
      )
    },
    detailItemlist(item) {
      if(parseInt(this.vatType)==2){
        this.taxRage = 7
        var netAmountItem = this.formatMoney(((1 * item.units[0].price) - this.numberInt(0)) - ((((1 * item.units[0].price) - this.numberInt(0)) * 100) / (this.taxRage + 100)))
      }else{
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
        amount: this.formatMoney(1* item.units[0].price),
        netAmountItem: netAmountItem, // ลบอัตราภาษีมูลค่าเพิ่มของสินค้า
        home_amount: this.formatMoney(1 * item.units[0].price),
        stock_list: item.stock_list,
        ref_no: this.DocNo
      })
      this.calVatnetAmount()
    },
    delete_item(index) {
      this.hold++
        if (this.hold === 2) {
          swal({
            title: "ลบรายการสินค้า",
            text: "ท่านต้องการลบรายการสินค้าที่เลือกหรือไม่",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function(isConfirm){
            if (isConfirm) {              
              this.detail_itemlists.splice(index, 1)
              for (var i = 0; i < this.detail_itemlists.length; i++) {
                this.detail_itemlists[i].no = i + 1
              }
              this.hold = 0
              this.calVatnetAmount()
              swal("Deleted!", "ลบสินค้าเรียบร้อยแล้ว", "success",{ Timer: 2000});
            } else {
              
            }
          }.bind(this))
        }
      setTimeout(function() {
        this.hold = 0
      }.bind(this), 700)
    },
    calVatnetAmount() {
      // console.log (this.vatType)
      var sumTotal = 0
      for (var i = 0; i < this.detail_itemlists.length; i++) {
        sumTotal += this.numberInt(this.detail_itemlists[i].amount)
      }
      switch (parseInt(this.vatType)) {
        case 1: // แยกนอก
          console.log("แยกนอก " + sumTotal)
          this.taxRage = 7
          this.netVatAmount = this.formatMoney((sumTotal - this.numberInt(this.billDiscount)) * (this.taxRage / 100))
          this.totalItemAmount = this.formatMoney(sumTotal)
          this.billnetAmount = this.numberInt(this.netVatAmount) + (sumTotal - this.numberInt(this.billDiscount))
          if (this.billDiscount.includes("%") == true) {
            this.billDiscount = numeral(this.numberInt(this.billDiscount)).format('0%')
          } else {
            this.billDiscount = this.formatMoney(this.billDiscount)
          }
          this.beforeNetAmount = this.totalItemAmount-this.billDiscount
          break
        case 2: // รวมใน
          console.log("รวมใน " + sumTotal)
          this.taxRage = 7
          this.netVatAmount = this.formatMoney((sumTotal - this.numberInt(this.billDiscount)) - (((sumTotal - this.numberInt(this.billDiscount)) * 100) / (this.taxRage + 100)))
          this.totalItemAmount = this.formatMoney(sumTotal)
          this.billnetAmount = this.numberInt(sumTotal - this.numberInt(this.billDiscount))
          if (this.billDiscount.includes("%") === true) {
            this.billDiscount = numeral(this.numberInt(this.billDiscount)).format('0%')
          } else {
            this.billDiscount = this.formatMoney(this.billDiscount)
          }
          this.beforeNetAmount = this.numberInt(this.billnetAmount)-this.numberInt(this.netVatAmount)
          break
        case 3: // อัตราศูนย์
          console.log("อัตราศูนย์ " + sumTotal)
          this.netVatAmount = this.formatMoney(0)
          this.totalItemAmount = this.formatMoney(sumTotal)
          this.billnetAmount = this.numberInt(sumTotal)
          if (this.billDiscount.includes("%") == true) {
            this.billDiscount = numeral(this.numberInt(this.billDiscount)).format('0%')
          } else {
            this.billDiscount = this.formatMoney(this.billDiscount)
          }
          this.taxRage = 0
          this.beforeNetAmount = this.totalItemAmount-this.billDiscount
          break
        default:
          console.log(this.vatType)
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
          bar_code: '',
          item_name: val['item_name'],
          wh_code: val['stock_select']['wh_code'],
          shelf_code: val['stock_select']['shelf_code'],
          qty: numeral(val['qty']).value(),
          remain_qty: numeral(val['qty']).value(),
          unit_code: val['unit_select']['unit_code'],
          price: numeral(val['price']).value(),
          discount_word_sub: val['discount'],
          discount_amount_sub: numeral(val['discount']).value(),
          amount: numeral(val['amount']).value(),
          net_amount: numeral(val['netAmountItem']).value(),
          home_amount: numeral(val['home_amount']).value(),
          my_description: '',
          ref_no: val['ref_no'],
          is_cancel: 0,
          packing_rate1: val['unit_select']['packing_rate'],
          packing_rate2: val['unit_select']['packing_rate'],
          ref_line_number: 0,
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
        tax_type: this.vatType,
        credit_day: this.creditDay,
        due_date: this.return_date(this.dueDate),
        delivery_day: this.sendDay,
        delivery_date: this.return_date(this.deliveryDate),
        expire_day: this.expDay,
        expire_date: this.return_date(this.ExpDate),
        contract_id: 0,
        is_condition_send: this.isConditionSend,
        my_description: this.discription1 + '|' + this.discription2,
        sum_item_amount: sumTotal,
        dis_count_word: this.billDiscount,
        dis_count_amount: this.numberInt(this.billDiscount),
        after_discount_amount: this.numberInt(this.totalItemAmount)-this.numberInt(this.billDiscount), // ลบส่วนลดท้ายบิล
        before_tax_amount: this.beforeNetAmount, // ถอด vat 7% รวมใน
        tax_amount: this.numberInt(this.netVatAmount),
        total_amount: this.billnetAmount,
        approve_id: 0,
        project_id: 0,
        allocate_id: 0,
        creator_code: this.usercode,
        create_date_time: '',
        bill_type: this.billType,
        validity: this.sendpriceDay,
        customer_assert: this.custo_assert,
        subs: item_Sub
      }
      // console.log(item_Sub)
      console.log(obj)
      if(this.EmpID!='' && this.detail_itemlists.length != 0){
        api.insertQTAX(obj,
          (result) => {
            alert("บันทึกเรียบร้อยเอกสารเลขที่ "+ this.DocNo + " เรียบร้อยแล้ว")
            this.$router.push('/Saleh')
          },
          (error) => {
            $("#loading").removeClass('is-active')
            alert('กรุณาตรวจสอบเซิร์ฟเวอร์ ' + error)
            console.log(error)
          }
        )
      }else{
        if(this.EmpID==0){
          swal("กรุณาเลือกพนักงานขาย")
          $("#loading").removeClass('is-active')
          this.SearchEmplo()         
        }else{
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
          function(){
            this.SearchItem()
          }.bind(this))
        }
      }
    }
  },
  mounted() {
    this.params = this.$route.params.status
    var userDetail = JSON.parse(localStorage.DataUser)
    this.usercode = userDetail.usercode
    console.log(this.usercode)
    this.GenDocNo('QT', 0)
    this.toDay()
    moment.locale()
  }
}
