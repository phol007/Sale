import api from '../../service/service1.js'
import $ from 'jquery'
import moment from 'moment'
import numeral from 'numeral'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'saleorder',
  data () {
    return {
      msg: 'WelCome SO Nopadol from file so.js',
      docNo: '',
      docDate: '',
      nowDate: {},
      disabled: false,
      item_lists: [],
      count_list_items: 0,
      cust_lists: [],
      count_list_cust: 0,
      sale_lists: [],
      customer_lists: [],
      tool_menu: [],
      status: 'New',
      keyword: '',
      arId: 0,
      arCode: '',
      arName: '',
      arDetail: '',
      saleId: 0,
      saleCode: '',
      saleName: '',
      saleDetail: '',
      detail_itemlists: [],
      detail_custlists: [],
      moSitem: '',
      moScust: '',
      moScus: '',
      moSsale: '',
      taxType: 1,
      docType: 0,
      billType: 0,
      totalNetAmount: this.formatMoney(0),
      totalItemAmount: this.formatMoney(0),
      sumBeforeTaxAmount: this.formatMoney(0),
      sumTaxAmount: this.formatMoney(0),
      unit_list: '',
      stock_list: '',
      is_cancel: 0,
      is_confirm: 0,
      departCode: '',
      creditDay: 0,
      dueDate: '',
      deliveryDay: 0,
      deliveryDate: '',
      taxRage: 7,
      myDescription: '',
      billStatus: 0,
      docType: 0,
      holdingStatus: 0,
      sumOfItemAmount: 0,
      discountWord: '',
      discountAmount: 0,
      afterDiscount: 0,
      beforeTaxAmount: 0,
      taxAmount: 0,
      totalAmount: 0,
      netAmount: 0,
      isConditionSend: 0,
      creatorId: 0,
      creatorCode: '',
      creatorDateTime: '',
      poRefNo: '',
      jobId: '',
      receiveName: '',
      carLicense: '',
      receiveTel: '',
      weight_all: 0
    }
  },
  components: {
    Datepicker
  },
  methods: {
    genDocNo(tableName, billType) {
      $("#loading").addClass('is-active')
      api.genDocNoAX(tableName, billType,
        (result) => {
          $("#loading").removeClass('is-active')
          this.docNo = result.data.new_doc_no
          this.docDate = moment(this.toDate).format('MM/DD/YYYY')
          //alert(this.docNo)
          // this.calExpDate(this.expDay)
          // this.calDeliDate(this.sendDay)
          this.nowDate = {
            to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          }
        },
        (error) => {
          //$("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ ' + error)
          console.log(error)
        }
      )
      this.calcDueDate(0, 0)
    },
    searchItem() {
      if (this.arCode) {
        $('#mSearchItem').addClass('is-active')
        this.moSitem = ''
        this.searchItems(this.moSitem)
      } else {
        alert("กรุณาเลือกลูกค้าก่อน ค้นหาสินค้า")
      }
    },
    closeSearchItem() {
      $('#mSearchItem').removeClass('is-active')
    },
    searchItems(keyword) {
      //$("#loading").addClass('is-active')
      api.searchItemAX(keyword, this.billType, this.arID, this.isConditionSend,
        (result) => {
          //$("#loading").removeClass('is-active')
          if (result.status == "success") {
            this.item_lists = result.data
            // console.log(JSON.stringify(this.item_lists))
          }
        },
        (error) => {
          //$("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ ' + error)
          console.log(error)
        }
      )
    },
    selectItem(item) {
      this.closeSearchItem()
      this.detailItemList(item)
    },
    detailItemList(item) {
      console.log(item)
      this.detail_itemlists.push({
        no: this.detail_itemlists.length + 1,
        item_code: item.item_code,
        item_name: item.item_name,
        units: item.units,
        unit_select: item.units[0],
        stock_select: item.stock_list[0],
        qty: this.formatMoney(1),
        price: item.units[0].price,
        discount_word_sub:"",
        discount_amount_sub: this.formatMoney(0),
        amount: 1 * item.units[0].price,
        stock_list: item.stock_list
      })
      this.calcTotalNetAmount()
      console.log(this.detailItemList)
    },
    searchCustomer() {
      $('#mSearchCustomer').addClass('is-active')
      this.moScus = ''
      this.searchCustomers(this.moScus)
    },
    searchCustomers(keyword) {
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
    selectCustomer(CusD) {
      this.closeSearchCustomer()
      this.arCode = CusD.ar_code
      this.arDetail = CusD
      this.arName = CusD.ar_name
      this.calDueDate(CusD.credit_day)
    },
    closeSearchCustomer() {
      $('#mSearchCustomer').removeClass('is-active')
    },
    searchSale() {
      $('#mSearchSale').addClass('is-active')
      this.moSsale = ''
      this.searchSales(this.moSsale)
    },
    searchSales(keyword) {
      api.searchSaleAX(keyword, this.saleCode,
        (result) => {
          if (result.status == "success") {
            this.sale_lists = result.data
          }
        },
        (error) => {
          alert('Error = ' + error)
          console.log(error)
        }
      )
    },
    selectSale(SaleD) {
      this.closeSearchSale()
      this.saleDetail = SaleD
      this.saleCode = SaleD.sale_code
      this.saleName = SaleD.sale_name
    },
    closeSearchSale() {
      $('#mSearchSale').removeClass('is-active')
    },
    calcDueDate (type, addDay) {
      //alert("addDay"+ addDay)
      var d = new Date()
      d.setDate(d.getDate() + parseInt(addDay)) 
      var vMonth = d.getMonth()
      var vMonth = new String(vMonth)

      if (vMonth.length == 1) {
        vMonth = "0" + (vMonth)
      }
      var vDate = d.getDate();
      vDate= new String(vDate)
      if (vDate.length == 1) {
        vDate = "0" + vDate
      }
      var vYear = d.getFullYear()

      //alert("Type = " + type)
      if (type == 0) {
        this.deliveryDate = moment(new Date(vYear, vMonth, vDate)).format('YYYY/MM/DD')
        this.dueDate = moment(new Date(vYear, vMonth, vDate)).format('YYYY/MM/DD')
      }
      if (type == 1) {
        this.deliveryDate = moment(new Date(vYear, vMonth, vDate)).format('YYYY/MM/DD')
      }
      if (type == 2) {
        this.dueDate = moment(new Date(vYear, vMonth, vDate)).format('YYYY/MM/DD')
      }
      
      //alert(this.dueDate)
    },
    calcDekiveryDate (addDay) {
      var d = new Date()
      d.setDate(d.getDate() + parseInt(addDay))
      // var vM
    },
    calcreditDay(date) {
      var oneDay = 24 * 60 * 60 * 1000
      var firstDate = new Date()
      var secondDate = date
      // var diffDays = Math.floor(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)))
      var difference = firstDate.getTime() - secondDate.getTime()
      // แปลงเป็นวัน ชม. นาที วินาที
      var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
      this.creditDay = Math.abs(daysDifference)
    },
    numberInt(str) {
      return numeral(str).value()
    },
    formatMoney(int) {
      return numeral(int).format('0,0.00')
    },
    calcTotalNetAmount(taxType) {
      var vSumTotalAmount = 0
      var vBeforeTaxAmount = 0
      var vTaxAmount = 0
      // alert('item list =' + this.detail_itemlists.length)
      if (price == '') {
        price = unit.price
      }
      for (var i = 0; i < this.detail_itemlists.length; i++) {
        if (i == lineNumber - 1) {
            vSumTotalAmount += this.numberInt(this.detail_itemlists[i].netAmountItem)
            data[i].unit = unit
            data[i].qty = this.formatMoney(this.numberInt(cnt))
            data[i].price = this.formatMoney(this.numberInt(price))
            data[i].discount = discount
            data[i].amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount))
            data[i].netAmountItem = this.numberInt(netAmountItem)
            data[i].home_amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount))
          }
      }
      // alert("sumTotalAmount ="+ sumTotalAmount)

      if (this.numberInt(discount) <= this.numberInt(itemAmount)) {
        var data = this.detail_itemlists
        if (discount.includes("%") === true) {
          discount = numeral(this.numberInt(discount)).format('0%')
        } else {
          discount = this.formatMoney(discount)
        }
        if (parseInt(this.vatType) == 2) {
          this.taxRage = 7
          // console.log(true)
          vBeforeTaxAmount = (vSumTotalAmount * 100) / 107
          vTaxAmount = vSumTotalAmount-vBeforeTaxAmount
          this.sumTaxAmount = this.formatMoney(vTaxAmount)
          this.sumBeforeTaxAmount = this.formatMoney(vBeforeTaxAmount)
          this.totalNetAmount = this.formatMoney(vSumTotalAmount)
          this.totalItemAmount = this.formatMoney(vSumTotalAmount)

          var netAmountItem = ((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount)) - (((((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount)) * 100) / (this.taxRage + 100)))
          netAmountItem = this.formatMoney(this.numberInt(cnt) * this.numberInt(price) - netAmountItem)
        } else {
          var netAmountItem = this.formatMoney(this.numberInt(cnt) * this.numberInt(price))
        }

      } else {
        // alert("ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า")
        swal("แจ้งเตือน", "ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า", "warning")
        this.detail_itemlists[lineNumber - 1].discount = this.formatMoney(0)
      }

       //alert(this.totalItemAmount)
      // alert(this.sumBeforeTaxAmount)

    },
    calcItemAmount1(line_number) {
      var totalItemAmount = 0
     // alert(line_number)
      totalItemAmount = this.detail_itemlists[line_number].price * this.detail_itemlists[line_number].qty
      this.detail_itemlists[line_number].netItemAmount = totalItemAmount
      //alert(this.detail_itemlists[line_number].qty)
     // alert(this.detail_itemlists[line_number].netItemAmount)
    },
    calcItemAmount(line_number, unit, qty, price, discount, item_amount) {
      //alert('lineNumber = '+lineNumber+', unit = '+unit+', cnt = '+cnt+', price = '+price+', discount = '+discount)
      if (price == '') {
        price = unit.price
      }
      if (this.numberInt(discount) <= this.numberInt(item_amount)) {
        var data = this.detail_itemlists
        for (var i = 0; i < this.detail_itemlists.length; i++) {
          if (i == line_number - 1) {
            data[i].unit = unit
            data[i].qty = this.formatMoney(this.numberInt(qty))
            data[i].price = this.formatMoney(this.numberInt(price))
            data[i].discount = this.formatMoney(discount)
            data[i].netAmountItem = this.formatMoney((this.numberInt(qty) * this.numberInt(price)) - this.numberInt(discount))
          }
        }
        this.calcTotalNetAmount()
      } else {
        alert("ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า")
        this.detail_itemlists[line_number - 1].discount = this.formatMoney(0)
      }
    },
    insert_saleorder() {
      $("#loading").addClass('is-active')
      var sum_total_amount = 0
      for (var i = 0; i < this.detail_itemlists.length; i++) {
        sum_total_amount += this.numberInt(this.detail_itemlists[i].amount)
      }
      var item_sub = []
      var DocNo = this.DocNo

      this.detail_itemlists.forEach(function(val, key) {
          item_sub.push({
          item_id: val['item_id'],
          item_code: val['item_code'],
          bar_code: '',
          item_name: val['item_name'],
          wh_code: val['stock_select']['wh_code'],
          shelf_code: val['stock_select']['shelf_code'],
          qty:        numeral(val['qty']).value(),
          remain_qty: numeral(val['qty']).value(),
          unit_code: val['unit_select']['unit_code'],
          price:     numeral(val['price']).value(),
          discount_word_sub: val['discount_word_sub'],
          discount_amount_sub: numeral(val['discount_amount_sub']).value(),
          amount: numeral(val['amount']).value(),
          net_amount: numeral(val['amount']).value(),
          home_amount: numeral(val['amount']).value(),
          item_description: val['item_description'],
          ref_no: val['ref_no'],
          q_id: val['q_id'],
          is_cancel: val['is_cancel'],
          packing_rate1: val['unit_select']['packing_rate'],
          packing_rate2: val['unit_select']['packing_rate'],
          ref_line_number: numeral(val['ref_line_number']).value(),
          line_number: val['line_number']
        })
      })

      var obj = {
        doc_no: this.docNo,
        doc_date: '',
        bill_type: this.billType,
        tax_type: this.taxType,
        ar_id: this.arDetail.id,
        ar_code: this.arDetail.ar_code,
        ar_name: this.arDetail.ar_name,
        ar_bill_address: this.arDetail.address,
        ar_telephone: this.arDetail.ar_telephone,
        sale_id: this.saleDetail.id,
        sale_code: this.saleCode,
        sale_name: this.saleName,
        depart_code: this.departCode,
        credit_day: this.numberInt(this.creditDay),
        due_date: this.dueDate,
        delivery_day: this.numberInt(this.deliveryDay),
        delivery_date: this.deliveryDate,
        tax_rate: this.taxRate,
        is_confirm: this.is_confirm,
        my_description: this.myDescription,
        bill_status: this.billStatus,
        so_status: this.docType,
        holding_status: this.holdingStatus,
        sum_of_item_amount: this.numberInt(this.totalItemAmount),
        discount_word: this.discountWord,
        discount_amount: this.numberInt(this.discountAmount),
        after_discount: this.numberInt(this.afterDiscountAmount),
        before_tax_amount: this.numberInt(this.sumBeforeTaxAmount),
        tax_amount: this.numberInt(this.sumTaxAmount),
        total_amount: this.numberInt(this.totalNetAmount),
        net_amount: this.numberInt(this.totalNetAmount),
        is_cancel: this.is_cancel,
        is_condition_send: this.isConditionSend,
        creator_id: this.creatorId,
        creator_code: this.creatorCode,
        creator_date_time: this.createDateTime,
        subs: item_sub
      }
      //alert(this.total_amount)
      console.log('insert =' + JSON.stringify(obj))
      if (this.saleCode != '' && this.detail_itemlists.length != 0) {
        api.insertSaleOrderAX(obj,
          (result) => {
            //swal("แจ้งเตือน", "ันทึกเรียบร้อย เอกสารเลขที่ " + this.docNo + " เรียบร้อยแล้ว", "success")
            //this.$rounter.push('/saleH')
          },
          (error) => {
            $("#loading").removeClass('is-active')
            //swal("Warning !!", "กรณาตรวจสอบเซิร์ฟเวอร์" + error, "warning")
            console.log(error)
          }
        )
      }
    },
    setMenuTool(status) {
      if (status == 0) {
        this.tool_menu = [{
            text: 'ย้อนกลับ',
            icon: 'fa fa-chevron-left',
            func: 1
          },
          {
            text: 'บันทึกเอกสาร',
            icon: 'fa fa-pencil-square-o',
            func: 2
          },
          {
            text: 'คู่มือใช้',
            icon: 'fa fa-question',
            func: 3
          }
        ]
      } else {
        this.tool_menu = [{
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
            text: 'คู่มือใช้งาน',
            icon: 'fa fa-question',
            func: 3
          }
        ]
      }
    },
    funcMenu(type) {
      switch (type) {
        case 1:
         // alert(type)
          this.goTo("/Main")
          break
        case 2:
         // alert(type)
          this.insert_saleorder()
          break
        case 3:
         // alert(type)
          alert("คู่มือใช้งานยังไม่ได้ทำครับ")
          break
      }
    }
  },
  mounted() {
    this.params = this.$route.params
    this.params.status = 0
    // alert(this.params.status)
    if (this.params.status == 0) {
      // this.genDocNo('SO', 0)
      this.docNo = 'เอกสารใหม่'
      this.setMenuTool(0)
      //this.toDay()
    } else if (this.params.status == 1) {
      this.showDetail_QT(this.params.docno)
      this.disabled = true
      this.setMenuTool(1)
    }
    //this.toDay()
    //moment.locale()
    var title = document.getElementById('titleProgram')
    title.innerHTML = 'SaleOrder'
  }


}
