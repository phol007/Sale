export default {
  name: 'app',
  data () {
  	return {
  		usercode: '',
  		username: '',
  		rolename: ''
  	}
  },
  methods: {
  	check_user () {
  		if(localStorage.DataUser){
  			//console.log(localStorage.DataUser)
  			var user = JSON.parse(localStorage.DataUser)
  			this.usercode = user.usercode
  			this.username = user.username
  			this.rolename = user.rolename
  		}else{
  			console.log('nouser')
  		}
  	}
  },
  mounted () {
  	setInterval(function () {
  		this.check_user()
  	}.bind(this),1000)
  }
}