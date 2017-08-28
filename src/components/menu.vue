<template>
	<div class="menu">
		<div class="Cont" style="text-align:center;">
		<h1 style="font-size: 30px; font-weight:bold; padding: 1%;">
			{{ msg }}
		</h1>

		<button class="button is-dark is-large" style="width: 90%; margin: 0.5%;" @click="goTo('Qtd', menu)" v-for="menu in menu_lists" v-show="menu.is_create==1">
			{{ menu.menuname }}
		</button>

			<md-speed-dial md-mode="scale" class="md-fab-bottom-right" style="position: fixed;">
			  <md-button class="md-fab" md-fab-trigger>
			    <md-icon md-icon-morph><i class="fa fa-times" aria-hidden="true"></i></md-icon>
			    <md-icon><i class="fa fa-th" aria-hidden="true"></i></md-icon>
			  </md-button>

			  <md-button class="md-fab md-mini md-clean" @click="goTo('/Saleh')">
			    <md-icon><i class="fa fa-chevron-left" aria-hidden="true"></i></md-icon>
			  	<md-tooltip md-direction="left" style="font-size:14px;">ย้อนกลับ</md-tooltip>
			  </md-button>	

			  <md-button class="md-fab md-mini md-clean">
			    <md-icon><i class="fa fa-question" aria-hidden="true"></i></md-icon>
			    <md-tooltip md-direction="left" style="font-size:14px;">คู่มือ</md-tooltip>
			  </md-button>
			</md-speed-dial>
		</div>
	</div>
</template>

<script src="../js/menu.js"></script>