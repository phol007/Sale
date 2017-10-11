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
    sumTotal_item (obj) {
      var sumTotal = 0
      for (var i = 0; i < obj.length; i++) {
        sumTotal += this.numberInt(obj[i].amount)
      }
      return sumTotal
    },
    Case_netVatAmount (vatType, sumTotal, billDiscount, taxRage) {
      switch (vatType) {
        case 1: // แยกนอก
          console.log('แยกนอก Case_netVatAmount' + sumTotal)
          return this.formatMoney((sumTotal - this.numberInt(billDiscount)) * (taxRage / 100))
        case 2: // รวมใน
          console.log('รวมใน Case_netVatAmount' + sumTotal)
          return this.formatMoney((sumTotal - this.numberInt(billDiscount)) - (((sumTotal - this.numberInt(billDiscount)) * 100) / (taxRage + 100)))
        case 3: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_netVatAmount' + sumTotal)
          return this.formatMoney(0)
        default:
          console.log(vatType)
      }
    },
    Case_billnetAmount (vatType, netVatAmount, sumTotal, billDiscount) {
      switch (vatType) {
        case 1: // แยกนอก
          console.log('แยกนอก Case_billnetAmount' + sumTotal)
          return this.numberInt(netVatAmount) + (sumTotal - this.numberInt(billDiscount))
        case 2: // รวมใน
          console.log('รวมใน Case_billnetAmount' + sumTotal)
          return this.numberInt(sumTotal - this.numberInt(billDiscount))
        case 3: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_billnetAmount' + sumTotal)
          return this.numberInt(sumTotal - this.numberInt(billDiscount))
        default:
          console.log(vatType)
      }
    },
    Case_beforNetAmount (vatType, billnetAmount, netVatAmount, totalItemAmount) {
      switch (vatType) {
        case 1: // แยกนอก
          console.log('แยกนอก Case_beforNetAmount' + totalItemAmount)
          return totalItemAmount - billnetAmount
        case 2: // รวมใน
          console.log('รวมใน Case_beforNetAmount' + totalItemAmount)
          return this.numberInt(billnetAmount) - this.numberInt(netVatAmount)
        case 3: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_beforNetAmount' + totalItemAmount)
          return totalItemAmount - billnetAmount
        default:
          console.log(vatType)
      }
    },
    Case_checkbillDiscount (vatType, billDiscount, billnetAmount, sumTotal) {
      switch (vatType) {
        case 1: // แยกนอก
          console.log('แยกนอก Case_beforNetAmount' + billnetAmount)
          if (this.numberInt(this.billDiscount) > this.numberInt(this.billnetAmount)) {
            return true
          } else {
            return false
          }
        case 2: // รวมใน
          console.log('รวมใน Case_beforNetAmount' + billnetAmount)
          if (this.numberInt(this.billDiscount) > this.numberInt(sumTotal)) {
            return true
          } else {
            return false
          }
        case 3: // อัตราศูนย์
          console.log('อัตราศูนย์ Case_beforNetAmount' + billnetAmount)
          if (this.numberInt(billDiscount) > this.numberInt(billnetAmount)) {
            return true
          } else {
            return false
          }
        default:
          console.log(vatType)
      }
    },
    numberInt (str) {
      return numeral(str).value()
    },
    formatMoney (int) {
      return numeral(int).format('0,0.00')
    },
    checkStock (stock, qty) {
      if (stock > qty) {
        return true
      }
    }
  }
})
