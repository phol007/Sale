import Vue from 'vue'
import numeral from 'numeral'

Vue.mixin({
  methods: {
    calweight_all (obj) {
      var weight = 0
      for (var i = 0; i < obj.length; i++) {
        weight += this.numberInt(obj[i].qty) * obj[i].weight
      }
      return weight
    },
    numberInt (str) {
      return numeral(str).value()
    },
    formatMoney (int) {
      return numeral(int).format('0,0.00')
    },
    sumTotal_item (obj) {
      var sumTotal = 0
      for (var i = 0; i < obj.length; i++) {
        sumTotal += this.numberInt(obj[i].amount)
      }
      return sumTotal
    },
    Case_netVatAmount (vatType, sumTotal, billDiscount, taxRage) {
      switch (vatType) {
        case 0: // แยกนอก
          console.log('แยกนอก Case_netVatAmount' + sumTotal)
          return this.formatMoney((sumTotal - this.numberInt(billDiscount)) * (taxRage / 100))
        case 1: // รวมใน
          console.log('รวมใน Case_netVatAmount' + sumTotal)
          return this.formatMoney((sumTotal - this.numberInt(billDiscount)) - (((sumTotal - this.numberInt(billDiscount)) * 100) / (taxRage + 100)))
        case 2: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_netVatAmount' + sumTotal)
          return this.formatMoney(0)
        default:
          console.log(vatType)
      }
    },
    Case_billnetAmount (vatType, netVatAmount, sumTotal, billDiscount) {
      switch (vatType) {
        case 0: // แยกนอก
          console.log('แยกนอก Case_billnetAmount' + sumTotal)
          return this.numberInt(netVatAmount) + (sumTotal - this.numberInt(billDiscount))
        case 1: // รวมใน
          console.log('รวมใน Case_billnetAmount' + this.numberInt(sumTotal - this.numberInt(billDiscount)))
          return this.numberInt(sumTotal - this.numberInt(billDiscount))
        case 2: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_billnetAmount' + sumTotal)
          return this.numberInt(sumTotal - this.numberInt(billDiscount))
        default:
          console.log(vatType)
      }
    },
    Case_beforNetAmount (vatType, billDiscount, netVatAmount, totalItemAmount) {
      // alert(vatType + ',' + billDiscount + ',' + netVatAmount + ',' + totalItemAmount)
      switch (vatType) {
        case 0: // แยกนอก
          console.log('แยกนอก Case_beforNetAmount' + (this.numberInt(totalItemAmount) - this.numberInt(billDiscount)))
          return this.numberInt(totalItemAmount) - this.numberInt(billDiscount)
        case 1: // รวมใน
          console.log('รวมใน Case_beforNetAmount' + ((this.numberInt(totalItemAmount) - this.numberInt(billDiscount)) - this.numberInt(netVatAmount)))
          return (this.numberInt(totalItemAmount) - this.numberInt(billDiscount)) - this.numberInt(netVatAmount)
        case 2: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_beforNetAmount' + (this.numberInt(totalItemAmount) - this.numberInt(billDiscount)))
          return this.numberInt(totalItemAmount) - this.numberInt(billDiscount)
        default:
          console.log(vatType)
      }
    },
    Case_checkbillDiscount (vatType, billDiscount, billnetAmount, sumTotal) {
      switch (vatType) {
        case 0: // แยกนอก
          console.log('แยกนอก Case_checkbillDiscount' + billnetAmount)
          if (this.numberInt(this.billDiscount) > this.numberInt(this.billnetAmount)) {
            return true
          } else {
            return false
          }
        case 1: // รวมใน
          console.log('รวมใน Case_checkbillDiscount' + billnetAmount)
          if (this.numberInt(this.billDiscount) > this.numberInt(sumTotal)) {
            return true
          } else {
            return false
          }
        case 2: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_checkbillDiscount' + billnetAmount)
          if (this.numberInt(billDiscount) > this.numberInt(billnetAmount)) {
            return true
          } else {
            return false
          }
        default:
          console.log(vatType)
      }
    },
    checkStock (stock, packingRate, qty) {
      // alert('stock = ' + stock + ',' + packingRate + ',' + (packingRate * qty))
      if (stock >= (qty * packingRate)) {
        return true
      } else {
        return false
      }
    },
    keyInt (e) {
      if (e.keyCode !== 190) {
        if (e.keyCode !== 9) {
          if (e.keyCode !== 13) {
            if (e.keyCode !== 8) {
              if (e.keyCode < 46 || e.keyCode > 57) {
                e.returnValue = false
              }
            }
          }
        }
      }

      if (e.keyCode === 8) {
        e.returnValue = true
      }

      if (e.keyCode === 39) {
        e.returnValue = true
      }

      if (e.keyCode === 37) {
        e.returnValue = true
      }

      if (e.keyCode === 40) {
        e.returnValue = true
      }

      if (e.keyCode === 16) {
        e.returnValue = true
      }
    },
    keyNumber (e) {
      if (e.keyCode !== 190) {
        if (e.keyCode !== 9) {
          if (e.keyCode !== 13) {
            if (e.keyCode !== 8) {
              if (e.keyCode < 46 || e.keyCode > 57) {
                e.returnValue = false
              }
            }
          }
        }
      }

      if (e.keyCode === 8) {
        e.returnValue = true
      }

      if (e.keyCode === 39) {
        e.returnValue = true
      }

      if (e.keyCode === 37) {
        e.returnValue = true
      }

      if (e.keyCode === 40) {
        e.returnValue = true
      }

      if (e.keyCode === 16) {
        e.returnValue = true
      }
    }
  },
  created () {
    document.addEventListener('keyup', this.keyNumber)
  },
  destroyed () {
    document.removeEventListener('keyup', this.keyNumber)
  }
})
