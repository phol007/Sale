export default {
  name: 'menu',
  data () {
    return {
      msg: 'เลือกประเภทเอกสาร'
    }
  },
  methods: {
  	goTo (page) {
  		this.$router.push(page)
  	}
  },
  mounted () {
  	var title = document.getElementById('titleProgram')
  	title.innerHTML = 'New Document'
  }
}