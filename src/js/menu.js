export default {
  name: 'menu',
  data () {
    return {
      msg: 'เลือกประเภทเอกสาร',
      menu_lists: [],
      permission: []
    }
  },
  methods: {
    goTo (page) {
      this.$router.push(page)
    },
  	toDo (page, menu) {
      if(menu.is_create==1){
        switch(page){
          case 0 : this.$router.push({ name: 'Qtd', params: { status: 0, docno: '' }})
                  break
          case 1 : this.$router.push({ name: 'so', params: { status: 0, docno: '' }})
                  break
        }
      }
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