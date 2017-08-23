import api from '../service/services.js'
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
      api.loginAX(user, pass,
      (result) => {
        if(result.status == 'success'){
          localStorage.DataUser = JSON.stringify(result.data)
          this.$router.push('/Qth')
          alert('Login สำเร็จ')
        }
      },
      (error) => {
        alert('กรุณาตรวจสอบเซิร์ฟเวอร์ '+ error)
        console.log(error)
      })
    }
  },
  mounted () {
    var title = document.getElementById('titleProgram')
    title.innerHTML = 'Program Sale'
  }
}