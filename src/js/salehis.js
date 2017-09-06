import api from '../service/services.js'
import numeral from 'numeral'
import $ from 'jquery'
import Longpress from 'vue-longpress'

export default {
  name: 'QThistory',
  data() {
    return {
      menu: 1,
      menu_lists: [],
      keyword: '',
      history_lists: [],
      data_arr: [],
      pageIndex: [],
      tool: false,
      hold: 0,
      test: '',
      user: JSON.parse(localStorage.DataUser),
      dsearch: 0
    }
  },
  components: {Longpress},
  methods: {
    money_format (int) {
      return numeral(int).format('0,0.00')
    },
    goTo (page) {
      this.$router.push(page)
    },
    toDo (page, docno) {
      this.$router.push({ name: page, params: { status: 1, docno: docno } })
    },
    show_tool () {
      // this.hold = 0
      // this.test = setInterval(function() {
      //   this.hold += 1
      //   if (this.hold == 3) {
      //     this.holdover()
      //   }
      // }.bind(this), 500);
      this.tool = true
    },
    holdover () {
      clearInterval(this.test)
    },
    hide_tool () {
      //clearInterval(this.test)
      this.tool = false
    },
    logout () {
      localStorage.clear()
      this.$router.push('/')
    },
    menu_add () {
      var user = JSON.parse(localStorage.DataUser)
      this.menu_lists = user.menu
    },
    selectMenu(index) {
      this.menu = index
      this.history('')
    },
    history (keyword) {
      $("#loading").addClass('is-active')
      this.dsearch = 0
      this.pageIndex = []
      this.history_lists = []
      // console.log(keyword+', '+this.menu)
      if (this.menu == 1 || this.menu == 2) {
        api.historyAX(keyword, this.menu,
          (result) => {
            if (result.status == 'success') {
              if (result.data == null) {
                this.data_arr = []
              } else {
                this.data_arr = result.data
                this.page_detail(6)
              }
              $("#loading").removeClass('is-active')
            }
          },
          (error) => {
            $("#loading").removeClass('is-active')
            swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
            console.log(error)
          })
      } else {
        alert('ระบบยังไม่เปิดให้บริการ')
        this.menu = 1
        this.history('')
      }
    },
    checkDelete (keyword) {
      if (keyword == "") {
        if (this.dsearch == 0) {
          this.history('')
          this.dsearch = 1
        }
      }
    },
    page_detail (limit) {
      this.history_lists = []
      //alert(limit)
      // if(this.data_arr.length!=0){
      //   var listpage = 5
      //   var pageall = Math.ceil(this.data_arr.length/listpage)
      //   var userInpage = start+listpage

      //   if(userInpage>this.data_arr.length){
      //     userInpage = this.data_arr.length
      //   }
      if(this.data_arr.length<limit){
        limit = this.data_arr.length
      }
      for(var i = 0; i < limit; i++){
         this.history_lists.push(this.data_arr[i])
      }

      // // console.log("active "+ active + " start " + start)
      //   this.pageLine(pageall)          
      //   this.pageActive(active)
      // }else{
      //   this.history()
      // }
    },
    pageLine (size) {
      this.pageIndex = []
      for (var i = 0; i < size; i++) {
        this.pageIndex.push({ Index: i, Line: i + 1, limit: i * 5, isActive: false })
      }
      // console.log(JSON.stringify(this.pageIndex))
    },
    pageActive (int) {
      for (var r = 0; r < this.pageIndex.length; r++) {
        if (r == int - 1) {
          this.pageIndex[r].isActive = true
        } else {
          this.pageIndex[r].isActive = false
        }
      }
    },
    approve (data, e) {
      alert(data)
    },
    cancel (data) {
      $('#loading').addClass('is-active')
      var body = {
        id: data.id,
        is_cancel: 1,
        cancel_id: this.user.id,
        cancel_code: this.user.usercode,
        cancel_date_time: ''
      }
      //console.log(JSON.stringify(body))
      swal({
          title: "ยกเลิกเอกสาร",
          text: "ท่านต้องการยกเลิกเอาสารใบนี้หรือไม่ ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "ตกลง",
          cancelButtonText: "ปิด",
          closeOnConfirm: false
        },
        function () {
          api.cancelQTAX(body,
            (result) => {
              //console.log(result.data)
              $('#loading').removeClass('is-active')
              swal({
                title: "cancel Quotation",
                text: "ยกเลิกใบเสนอราคาเรียบร้อย",
                timer: 1000,
                type: "success",
                showConfirmButton: false
              })
              this.tool = false
              this.history('')
            },
            (error) => {
              this.tool = false
              $('#loading').removeClass('is-active')
              console.log(error)
            }
          )
        }.bind(this))
    },
    addList () {
      if($("#dataList").scrollTop() + $("#dataList").innerHeight() >= $("#dataList")[0].scrollHeight) {
        if(this.data_arr.length > this.history_lists.length+5){
          this.page_detail(this.history_lists.length+5)
        }else{
          this.page_detail(this.data_arr.length)
        }
      }else{
        if($("#dataList").scrollTop()==0){
          this.page_detail(6)
        }
      }
    }
  },
  computed: {
    sortedList() {
      return this.history_lists.sort((a, b) => a.doc_date < b.doc_date ? -1 : a.doc_date > b.doc_date ? 1 : 0)
    }
  },
  mounted () {
    var title = document.getElementById('titleProgram')
    title.innerHTML = 'Quotation'
    this.menu_add()
    this.history('')
    this.$nextTick(() => {
       $(".H-list").click(function(){
        $(this).hide();
    })
    })
  }
}
