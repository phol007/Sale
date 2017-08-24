import api from '../service/services.js'
import $ from 'jquery'
import numeral from 'numeral'

export default {
  name: 'QThistory',
  data () {
    return {
      menu: 1,
      menu_lists: [],
      keyword: '',
      history_lists: [],
      data_arr: [],
      pageIndex: []
    }
  },
  methods: {
    money_format (int) {
      return numeral(int).format('0,0.00')
    },
  	goTo (page) {
      console.log(page)
  		this.$router.push(page)
  	},
  	logout () {
      localStorage.clear()
  		this.$router.push('/')
  	},
    menu_add () {
      var user = JSON.parse(localStorage.DataUser)
      this.menu_lists = user.menu
    },
    selectMenu (index) {
      this.menu = index
      this.history ('')
    },
    history (keyword) {
      $("#loading").addClass('is-active')
      // console.log(keyword+', '+this.menu)
      if(this.menu==1 || this.menu == 2){
        api.historyAX(keyword, this.menu,
        (result) => {
          if(result.status == 'success'){
            this.data_arr = result.data          
            this.page_detail(0, 1)
            $("#loading").removeClass('is-active')
          }
        },
        (error) => {
          $("#loading").removeClass('is-active')
          alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
          console.log(error)
        })
      }else{
        alert('ระบบยังไม่เปิดให้บริการ')
        this.menu = 1
        this.history('')
      }
    },
    page_detail (start, active) {
      this.history_lists = []
      if(this.data_arr.length!=0){
        var listpage = 5
        var pageall = Math.ceil(this.data_arr.length/listpage)
        var userInpage = start+listpage

        if(userInpage>this.data_arr.length){
          userInpage = this.data_arr.length
        }

        for(var i = start; i < userInpage; i++){
          this.history_lists.push(this.data_arr[i])
        }

        // console.log("active "+ active + " start " + start)

        if(this.pageIndex!=0){                    
          this.pageActive(active)
        }else{          
          this.pageLine(pageall)          
          this.pageActive(active)
        }
      }else{
        this.history()
      }
    },
    pageLine (size) {
      for(var i = 0; i < size; i++){
        this.pageIndex.push({ Index: i, Line: i+1, limit: i*5, isActive: false})
      }
      // console.log(JSON.stringify(this.pageIndex))
    },
    pageActive (int) {
       for( var r = 0; r < this.pageIndex.length; r++){
        if(r == int-1){
          this.pageIndex[r].isActive = true
        }else{
          this.pageIndex[r].isActive = false
        }
      }
    }
  },
  mounted () {
    var title = document.getElementById('titleProgram')
    title.innerHTML = 'Quotation'
    this.menu_add()
    this.history('')
  }
}