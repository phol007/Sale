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
      creditDay: 0
    }
  },
  components: {    
    Datepicker
  },
  methods: {
  	SearchItem () {
  		$('#SItem').addClass('is-active')
  	},
  	CSItem () {
  		$('#SItem').removeClass('is-active')
  	},
  	SearchCusto () {
  		$('#SCusto').addClass('is-active')
  	},
  	CSCusto () {
  		$('#SCusto').removeClass('is-active')
  	},
    SearchEmplo () {
      $('#SEmplo').addClass('is-active')
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
    GenDocNo (tableName, billType) {
      $("#loading").addClass('is-active')
      api.gen_docNOAX(tableName, billType,
        (result) => {          
          $("#loading").removeClass('is-active')
          this.DocNo = result.data.new_doc_no
          this.DocDate = moment(this.toDate).format('MM/DD/YYYY')
          this.ExpDate = moment(this.calDay(this.expDay)).format('MM/DD/YYYY')
          this.deliveryDate = moment(this.calDay(this.sendDay)).format('MM/DD/YYYY')
          this.nowDate = {
              to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          }
          console.log(JSON.stringify(result))
          console.log(this.calDay(7))
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
          console.log(error)
        }
      )
    },
    calDay (Nday) {
      var day = new Date()
      var d = day.getDate()+Nday
      var m = day.getMonth()
      var y = day.getFullYear()
      return new Date(y, m, d)
    }
  },
  mounted () {
    this.params = this.$route.params.status
    this.GenDocNo('QT',0)
    this.toDay()
    moment.locale()
  }
}