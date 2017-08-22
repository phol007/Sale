import $ from 'jquery'
export default {
  name: 'Qtd',
  data () {
    return {
      
    }
  },
  methods: {
  	SearchItem () {
  		$('#SItem').addClass('is-active')
  	},
  	CSItem () {
  		$('#SItem').removeClass('is-active')
  	},
  	SearchCusto () {
  		$('#SCusto').addClass('is-active')
  	},
  	CSCusto () {
  		$('#SCusto').removeClass('is-active')
  	},
    SearchEmplo () {
      $('#SEmplo').addClass('is-active')
    },
    CSEmplo () {
      $('#SEmplo').removeClass('is-active')
    }
  }
}