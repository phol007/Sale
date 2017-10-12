import api from '../../service/service1.js'
import $ from 'jquery'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'saleorder',
  data() {
    return {
      msg: 'WelCome SO Nopadol from file so.js',
      docNo: '',
      docDate: '',
      nowDate: {},
      nowDocDate: {},
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
      moScus: '',
      moSsale: '',
      vatType: 1,
      docType: 0,
      billType: 0,
      billnetAmount: this.formatMoney(0),
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
      billDiscount: this.formatMoney(0),
      calVatnetAmount: this.formatMoney(0),
      netVatAmount: this.formatMoney(0),
      keyNumber: '',
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
    goTo(page) {
      this.$router.push(page)
    },
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
      $("#loading").addClass('is-active')
      api.searchItemAX(keyword, this.billType, this.arID, this.isConditionSend,
        (result) => {
          $("#loading").removeClass('is-active')
          if (result.status == "success") {
            this.item_lists = result.data
            // console.log(JSON.stringify(this.item_lists))
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
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
      var copy = false
      if (this.detail_itemlists.length != 0) {
        for (var k = 0; k < this.detail_itemlists.length; k++) {
          if (this.detail_itemlists[k].item_id == item.id) {
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
                  if (this.checkStock(item.stock_list[0].qty, item.units[0].packing_rate, 1)) {
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
                    this.calcTotalNetAmount()
                  } else {
                    swal("Warning !!", "สินค้าในสต๊อกมีไม่พอ", "warning")
                  }
                } else {

                }
              }.bind(this))
          } else {
            if (k == this.detail_itemlists.length - 1) {
              // alert(true)
              if (parseInt(this.vatType) == 2) {
                this.taxRage = 7
                var netAmountItem = this.formatMoney(((1 * item.units[0].price) - this.numberInt(0)) - ((((1 * item.units[0].price) - this.numberInt(0)) * 100) / (this.taxRage + 100)))
              } else {
                var netAmountItem = this.formatMoney(1 * item.units[0].price)
              }
              if (this.checkStock(item.stock_list[0].qty, item.units[0].packing_rate, 1)) {
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
                this.calcTotalNetAmount()
                k = this.detail_itemlists.length
              } else {
                swal("Warning !!", "สินค้าในสต๊อกมีไม่พอ", "warning")
              }
            }
          }
        }
      } else {
        if (parseInt(this.vatType) == 2) {
          this.taxRage = 7
          var netAmountItem = this.formatMoney(((1 * item.units[0].price) - this.numberInt(0)) - ((((1 * item.units[0].price) - this.numberInt(0)) * 100) / (this.taxRage + 100)))
        } else {
          var netAmountItem = this.formatMoney(1 * item.units[0].price)
        }
        if (this.checkStock(item.stock_list[0].qty, item.units[0].packing_rate, 1)) {
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
          this.calcTotalNetAmount()
        } else {
          swal("Warning !!", "สินค้าในสต๊อกมีไม่พอ", "warning")
        }
      }
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
      $("#loading").addClass('is-active')
      api.searchSaleAX(keyword, this.saleCode,
        (result) => {
          if (result.status == "success") {
            this.sale_lists = result.data
          }
          $("#loading").removeClass('is-active')
        },
        (error) => {
          $("#loading").removeClass('is-active')
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
    calcDekiveryDate(addDay) {
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
    calcTotalNetAmount() {
      if (this.numberInt(this.billDiscount) < 0) {
        swal("Warning !!", "ส่วนลดต้องไม่น้อยกว่า 0", "warning")
        this.billDiscount = this.formatMoney(0)
        this.calcTotalNetAmount()
      } else {
        if (this.vatType == 3) {
          this.taxRage = 0
        } else {
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
        if (calDiscount == true) {
          swal('Warning !!', 'ท่านใส่ส่วนลดมากเกินไป', 'warning')
          this.billDiscount = this.formatMoney(0)
          this.calcTotalNetAmount()
        }
      }
    },
    calcItemAmount(lineNumber, unit, cnt, price, discount, itemAmount, stock) {
      //alert('lineNumber = '+lineNumber+', unit = '+unit+', cnt = '+cnt+', price = '+price+', discount = '+discount)
      console.log(unit)
      if (this.checkStock(stock.qty, unit.packing_rate, this.numberInt(cnt))) {
        this.item_selected = ''
        this.stock_detail = ''
        if (price == '') {
          price = unit.price
        }
        // console.log(this.numberInt(discount) + ", " + this.numberInt(itemAmount))
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
              data[i].unit_select = unit
              data[i].qty = this.formatMoney(this.numberInt(cnt))
              data[i].price = this.formatMoney(this.numberInt(price))
              data[i].discount = discount
              data[i].amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount))
              data[i].netAmountItem = this.numberInt(netAmountItem)
              data[i].home_amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(price)) - this.numberInt(discount))
              data[i].stock_select = stock
              data[i].weight = this.numberInt(cnt) * data[i].weight
            }
          }
          this.calcTotalNetAmount()
        } else {
          // alert("ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า")
          swal("แจ้งเตือน", "ส่วนลดต้องไม่มากกว่ายอดรายการสินค้า", "warning")
          this.detail_itemlists[lineNumber - 1].discount = this.formatMoney(0)
        }
      } else {
        swal("แจ้งเตือน", "ท่านไม่สามารถขายสินค้าเกินสต๊อกได้", "warning")
        this.item_selected = ''
        this.stock_detail = ''
        if (price == '') {
          price = unit.price
        }

        cnt = 1
        // console.log(this.numberInt(discount) + ", " + this.numberInt(itemAmount))
        if (this.numberInt(discount) <= this.numberInt(itemAmount)) {
          for (var i = 0; i < this.detail_itemlists.length; i++) {
            if (i == lineNumber - 1) {
                var data = this.detail_itemlists
            if (discount.includes("%") === true) {
              discount = numeral(this.numberInt(discount)).format('(0.0%)')
            } else {
              discount = this.formatMoney(discount)
            }
            if (parseInt(this.vatType) == 2) {
              this.taxRage = 7
              // console.log(true)
              var netAmountItem = ((this.numberInt(cnt) * this.numberInt(data[i].units[0].price)) - this.numberInt(discount)) - (((((this.numberInt(cnt) * this.numberInt(data[i].units[0].price)) - this.numberInt(discount)) * 100) / (this.taxRage + 100)))
              netAmountItem = this.formatMoney(this.numberInt(cnt) * this.numberInt(data[i].units[0].price) - netAmountItem)
            } else {
              var netAmountItem = this.formatMoney(this.numberInt(cnt) * this.numberInt(data[i].units[0].price))
            }
          
              data[i].unit_select = data[i].units[0]
              data[i].qty = this.formatMoney(this.numberInt(cnt))
              data[i].price = this.formatMoney(this.numberInt(data[i].units[0].price))
              data[i].discount = discount
              data[i].amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(data[i].units[0].price)) - this.numberInt(discount))
              data[i].netAmountItem = this.numberInt(netAmountItem)
              data[i].home_amount = this.formatMoney((this.numberInt(cnt) * this.numberInt(data[i].units[0].price)) - this.numberInt(discount))
              data[i].stock_select = stock
              data[i].weight = this.numberInt(cnt) * data[i].weight
            }
          }
          this.calcTotalNetAmount()
        }
      }
    },
    return_price(units) {
      if (units == null) {
        return 'ไม่ได้ผูกราคา'
      } else {
        return this.formatMoney(units[0].price)
      }
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
          qty: numeral(val['qty']).value(),
          remain_qty: numeral(val['qty']).value(),
          unit_code: val['unit_select']['unit_code'],
          price: numeral(val['price']).value(),
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
      // if (this.saleCode != '' && this.detail_itemlists.length != 0) {
      //   api.insertSaleOrderAX(obj,
      //     (result) => {
      //       //swal("แจ้งเตือน", "ันทึกเรียบร้อย เอกสารเลขที่ " + this.docNo + " เรียบร้อยแล้ว", "success")
      //       //this.$rounter.push('/saleH')
      //     },
      //     (error) => {
      //       $("#loading").removeClass('is-active')
      //       //swal("Warning !!", "กรณาตรวจสอบเซิร์ฟเวอร์" + error, "warning")
      //       console.log(error)
      //     }
      //   )
      // }
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
          this.goTo("/Saleh")
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
