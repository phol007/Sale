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
          this.$router.push('/Saleh')
          $("#loading").removeClass('is-active')
          alert('Login สำเร็จ')
        }
      },
      (error) => {
        $("#loading").removeClass('is-active')
        alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
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