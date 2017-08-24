<template>
  <div id="app" style="overflow:hidden">
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
	  <div class="modal-background" style="overflow:hidden;"></div>
	  <div class="modal-content" style="background:none; height:100%; text-align:center;">
		<div class="sk-circle">
		  <div class="sk-circle1 sk-child"></div>
		  <div class="sk-circle2 sk-child"></div>
		  <div class="sk-circle3 sk-child"></div>
		  <div class="sk-circle4 sk-child"></div>
		  <div class="sk-circle5 sk-child"></div>
		  <div class="sk-circle6 sk-child"></div>
		  <div class="sk-circle7 sk-child"></div>
		  <div class="sk-circle8 sk-child"></div>
		  <div class="sk-circle9 sk-child"></div>
		  <div class="sk-circle10 sk-child"></div>
		  <div class="sk-circle11 sk-child"></div>
		  <div class="sk-circle12 sk-child"></div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script src="./js/app.js"></script>
