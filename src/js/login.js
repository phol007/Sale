import api from '../service/services.js'
import $ from 'jquery'
export default {
  name: 'login',
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
  	login (user, pass) {
      $("#loading").addClass('is-active')
      api.loginAX(user, pass,
      (result) => {
        if(result.status == 'success'){
          localStorage.DataUser = JSON.stringify(result.data)
          $("#loading").removeClass('is-active')
          swal({
            title: "ยินดีต้อนรับ",
            text: "ผู้ใช้งาน "+result.data.username+" เข้าสู่ระบบสำเร็จ !",
            timer: 2000,
            type: "success",
            showConfirmButton: false
          })
          setTimeout(function () {              
            this.$router.push('/Saleh')
          }.bind(this), 1000)        
        }
      },
      (error) => {
        $("#loading").removeClass('is-active')
        swal("Warning !!", "กรุณาตรวจสอบเซิร์ฟเวอร์ " + error, "warning")
        console.log(error)
      })
    }
  },
  mounted () {
    var title = document.getElementById('titleProgram')
    title.innerHTML = 'Program Sale'
    localStorage.clear()
  }
}