<template>
  <div id="app">
    <nav class="navbar">
	  <div class="navleft">
	  	<img src="./assets/nopadol-logo.png">
	  </div>
	  <div class="navright">
	  	<span id="titleProgram">Quotation</span>
	  </div>
	  <div class="profile" v-show="this.$route.path != '/'">
	  	<div class="img-pro">
	  		<img src="./assets/proflie.png">
	  	</div>
	  	<div class="detail-pro">
	  		<p>
	  			<b>
					{{ usercode }} : {{ username }}
	  			</b>
	  		</p>
	  		<p>
	  			{{ rolename }}
	  		</p>
	  	</div>
	  </div>
	</nav>
    <router-view></router-view>
    <div class="modal" id="loading">
	  <div class="modal-background"></div>
	  <div class="modal-content" style="height:auto; width:auto; background: #3e3e3f; text-align:center;">
	    <img src="./assets/loadding.gif" style="width:100px;">
	  </div>
	</div>
  </div>
</template>

<script src="./js/app.js"></script>
