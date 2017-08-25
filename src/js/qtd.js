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
      disabled: false
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
    GenDocNo (tableName, billType) {
      $("#loading").addClass('is-active')
      api.gen_docNOAX(tableName, billType,
        (result) => {          
          $("#loading").removeClass('is-active')
          this.DocNo = result.data.new_doc_no
          var date = moment(new Date()).format('DD-MM')+'-'+(parseInt(moment(new Date()).get('year')) + 543)
          date= date.split("-")
          this.DocDate = moment(new Date(date[2], date[1]-1, date[0])).format('MM/DD/YYYY')
          this.nowDate = {
              to: new Date(date[2], date[1]-1, date[0])
          }
          console.log(JSON.stringify(result))
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
          console.log(error)
        }
      )
    }
  },
  mounted () {
    this.params = this.$route.params.status
    this.GenDocNo('QT',0)
    moment.locale()
  }
}