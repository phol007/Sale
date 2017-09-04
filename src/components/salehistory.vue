<template>
	<div class="QThistory">
		<div class="Cont">
			<div class="Hsearch">
				<div class="HS-l">
					ค้นหา :
				</div>
				<div class="HS-c">
					<input type="text" class="input" placeholder="กรอกรายละเอียดที่ต้องการค้นหา" v-model="keyword" @keyup.enter="history(keyword)" @keyup.delete="checkDelete(keyword)">
				</div>
				<div class="HS-r">
					<button class="button is-info" @click="history(keyword)">
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
						<select v-model="menu" style="text-align:right;" @change="selectMenu(menu)">
							<option v-for="menus in menu_lists" :value="menus.menuid" style="text-align:right;">{{ menus.menuname }}</option>
						</select>
					</div>
				</div>
			</div>
			<div style="width:100%; height: 510px; overflow:auto;">
				<div class="H-list" v-for="lists in history_lists" @mousedown="show_tool" @mouseup="holdover" @mouseout="holdover" v-show="history_lists!=0" @click="toDo('Qtd', lists.doc_no)">
					<div class="H-list-img">
						<img src="../assets/logo.png">
					</div>
					<div class="H-list-detail" :class="{'cancel_doc': lists.is_cancel}">
						<p class="H-list-dtitle" :class="{'cancel_doc': lists.is_cancel}">{{ lists.doc_no }}</p>
						<p>{{ lists.ar_code }} | {{ lists.ar_name }}</p>
						<p>ยอดเงินสุทธิ {{ money_format(lists.total_amount) }} บาท</p>
						<p>พนง.ขาย {{ lists.sale_code }} | {{ lists.sale_name }}</p>
					</div>
					<div v-show="tool == true" style="height: 100%;">
						<div class="del" v-show="tool == true && lists.is_cancel == 0 && lists.is_confirm == 0" @click="cancel(lists)">
							<i class="fa fa-trash" aria-hidden="true"></i>
						</div>
						<div class="appp" v-show="tool == true && lists.is_confirm == 0 && lists.is_cancel==0" @click="approve(lists)">
							<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
						</div>
					</div>
				</div>
				<div class="H-list" v-show="history_lists==0" style="width:95% text-align:center; border:0; padding-left:40%; padding-top: 5%;">
					<span style="font-size:40px; color:red;">ไม่มีข้อมูล</span>
				</div>
			</div>
			<!-- <nav class="pagination" role="navigation" aria-label="pagination">
			  <ul class="pagination-list">
			    <li v-for="(pages, index) in pageIndex" @click="page_detail(pages.limit, pages.Line)">
	            	<a class="pagination-link" :class="{ 'is-current': pages.isActive }">{{  pages.Line }}</a>
	          	</li>
			  </ul>
			</nav> -->
			<md-button class="md-fab md-fab-bottom-right" v-show="tool==true" @click="hide_tool">
			  <i class="fa fa-times icon is-large" aria-hidden="true"></i>
			</md-button>
			<md-speed-dial md-mode="scale" class="md-fab-bottom-right" style="position: fixed;" v-show="tool==false">
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

<script src="../js/salehis.js"></script>