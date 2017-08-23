<template>
	<div class="login">
		<div class="Cont">
			<div class="L-logo">
				<img src="../assets/nopadol-logo.png">
			</div>
			<div class="L-form">
				<form @submit.prevent="login(user, pass)">
					<div class="field">
					  <p class="control has-icons-left has-icons-right">
					    <input class="input is-large" type="text" placeholder="Username" required v-model="user">
					    <span class="icon is-medium is-left">
					      <i class="fa fa-user"></i>
					    </span>
					    <span class="icon is-small is-right">
					    </span>
					  </p>
					</div>
					<div class="field">
					  <p class="control has-icons-left">
					    <input class="input is-large" type="password" placeholder="Password" required v-model="pass">
					    <span class="icon is-medium is-left">
					      <i class="fa fa-lock"></i>
					    </span>
					  </p>
					</div>
					<div class="field">
					  <p class="control">
					    <button class="button is-success is-large" style="width:100%;" type="submit">
					      Login
					    </button>
					  </p>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script src="../js/login.js"></script>