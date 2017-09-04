export default {
  name: 'menu',
  data () {
    return {
      msg: 'เลือกประเภทเอกสาร',
      menu_lists: []
    }
  },
  methods: {
  	goTo (page, menu) {
  		this.$router.push({ name: page, params: { status: 0, docno: '' }})
  	},
    menu_add () {
      var user = JSON.parse(localStorage.DataUser)
      this.menu_lists = user.menu
    }
  },
  mounted () {
  	var title = document.getElementById('titleProgram')
  	title.innerHTML = 'New Document'
    this.menu_add()
  }
}