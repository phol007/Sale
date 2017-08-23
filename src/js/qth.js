export default {
  name: 'QThistory',
  data () {
    return {
      menu: 1,
      menu_lists: []
    }
  },
  methods: {
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
    }
  },
  mounted () {
    var title = document.getElementById('titleProgram')
    title.innerHTML = 'Quotation'
    this.menu_add()
  }
}