export default {
  name: 'QThistory',
  data () {
    return {
      
    }
  },
  methods: {
  	goTo (page) {
      console.log(page)
  		this.$router.push(page)
  	},
  	logout () {
  		this.$router.push('/')
  	}
  },
  mounted () {
    var title = document.getElementById('titleProgram')
    title.innerHTML = 'Quotation'

    console.log(JSON.parse(localStorage.DataUser))
  }
}