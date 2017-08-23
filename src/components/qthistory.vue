<template>
	<div class="QThistory">
		<div class="Cont">
			<div class="Hsearch">
				<div class="HS-l">
					ค้นหา :
				</div>
				<div class="HS-c">
					<input type="text" class="input" placeholder="กรอกรายละเอียดที่ต้องการค้นหา">
				</div>
				<div class="HS-r">
					<button class="button is-info">
			      	<span class="icon">
					  <i class="fa fa-search"></i>
					</span>&nbsp;
					ค้นหา
				</button>
				</div>
				<div class="HS-select">
					<div style="width:40%; float:left; font-size: 18px;
		padding-top: 2.5%;">
					    ประเภทเอกสาร :
					</div>
					<div style="width:60%; float:left; text-align:right;">
						<select v-model="menu" style="text-align:right;">
							<option v-for="menus in menu_lists" :value="menus.menuid" style="text-align:right;">{{ menus.menuname }}</option>
						</select>
					</div>
				</div>
			</div>
			<div class="H-list" @click="goTo('/Qtd/status')">
				<div class="H-list-img">
					<img src="../assets/logo.png">
				</div>
				<div class="H-list-detail">
					<p class="H-list-dtitle">เลขที่เอกสาร</p>
					<p>รหัสลูกค้า | ชื่อลูกค้า</p>
					<p>ยอดเงินสุทธิ</p>
					<p>พนง.ขาย</p>
				</div>
			</div>
			<div class="H-list" @click="goTo('/Qtd/status')">
				<div class="H-list-img">
					<img src="../assets/logo.png">
				</div>
				<div class="H-list-detail">
					<p class="H-list-dtitle">เลขที่เอกสาร</p>
					<p>รหัสลูกค้า | ชื่อลูกค้า</p>
					<p>ยอดเงินสุทธิ</p>
					<p>พนง.ขาย</p>
				</div>
			</div>
			<div class="H-list" @click="goTo('/Qtd/status')">
				<div class="H-list-img">
					<img src="../assets/logo.png">
				</div>
				<div class="H-list-detail">
					<p class="H-list-dtitle">เลขที่เอกสาร</p>
					<p>รหัสลูกค้า | ชื่อลูกค้า</p>
					<p>ยอดเงินสุทธิ</p>
					<p>พนง.ขาย</p>
				</div>
			</div>
			<div class="H-list" @click="goTo('/Qtd/status')">
				<div class="H-list-img">
					<img src="../assets/logo.png">
				</div>
				<div class="H-list-detail">
					<p class="H-list-dtitle">เลขที่เอกสาร</p>
					<p>รหัสลูกค้า | ชื่อลูกค้า</p>
					<p>ยอดเงินสุทธิ</p>
					<p>พนง.ขาย</p>
				</div>
			</div>
			<nav class="pagination" role="navigation" aria-label="pagination">
			  <ul class="pagination-list">
			    <li>
			      <a class="pagination-link" aria-label="Page 1">1</a>
			    </li>
			    <li>
			      <a class="pagination-link" aria-label="Goto page 2">2</a>
			    </li>
			    <li>
			      <a class="pagination-link" aria-label="Goto page 3">3</a>
			    </li>
			  </ul>
			</nav>
			<md-speed-dial md-mode="scale" class="md-fab-bottom-right" style="position: fixed;">
			  <md-button class="md-fab" md-fab-trigger>
			    <md-icon md-icon-morph><i class="fa fa-times" aria-hidden="true"></i></md-icon>
			    <md-icon><i class="fa fa-th" aria-hidden="true"></i></md-icon>
			  </md-button>

			  <md-button class="md-fab md-mini md-clean" @click="logout">
			    <md-icon><i class="fa fa-power-off" aria-hidden="true"></i></md-icon>
			  	<md-tooltip md-direction="left" style="font-size:14px;">ออกจากระบบ</md-tooltip>
			  </md-button>			  

			  <md-button class="md-fab md-mini md-clean" @click="goTo('/menuDoc')">
			    <md-icon><i class="fa fa-plus" aria-hidden="true"></i></md-icon>
			    <md-tooltip md-direction="left" style="font-size:14px;">สร้างเอกสารใหม่</md-tooltip>
			  </md-button>

			  <md-button class="md-fab md-mini md-clean">
			    <md-icon><i class="fa fa-question" aria-hidden="true"></i></md-icon>
			    <md-tooltip md-direction="left" style="font-size:14px;">คู่มือ</md-tooltip>
			  </md-button>
			</md-speed-dial>
		</div>		
	</div>
</template>

<script src="../js/qth.js"></script>