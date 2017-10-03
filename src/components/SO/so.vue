<template>
	<div class="saleorder">
      <div class="Wcontainer">
    	<div class="head-r">
    		<div class="headR-l">
    			ราคารวมทั้งหมด
	      		<br>
	      		<i class="fa fa-money" aria-hidden="true"></i>
    		</div>
    		<div class="headR-r">
    			{{ totalNetAmount }} ฿
    		</div>   
			<div class="T-status">
		     	<b>Status : 
		     	<span style="color: green; font-size: 14px; line-height:40px;" v-show="isConfirm==1">อนุมัติแล้ว</span>
	    		<span style="color: red; font-size: 14px; line-height:40px;" v-show="isCancel == 1">ยกเลิกแล้ว</span>
	    		<span style="color: #000; font-size: 14px; line-height:40px;" v-show="isConfirm==0&&isCancel==0">New</span>
	    		</b>
		    </div> 		
    	</div>
    	<div class="head-l"><!-- 
    		<div class="headL-l">
    			ประเภทเอกสาร :
    		</div>
    		<div class="headL-r">
    			<select v-model="docType" @change="">
    			<option value=0> ใบสั่งขายสินค้า </option>
			    <option value=1> ใบสั่งจองสินค้า </option>
			   </select>
    		</div> -->    		
    		<div class="headL-l">
    			เลขที่เอกสาร :
    		</div>
    		<div class="headL-r">
    			<input type="text" class="input" placeholder="เลขที่เอกสาร ..." :value="docNo" readonly>
    		</div>
    		<div class="headL-l">
    		ประภทขาย :
    		</div>
    		<div class="headL-r">
    			<select v-model="billType" @change="">
    			<option value=0> ขายสินค้าเงินสด </option>
			    <option value=1> ขายสินค้าเงินเชื่อ </option>
			   </select>
    		</div>
    		<div class="headL-l">
    			ประเภทภาษี :
    		</div>
    		<div class="headL-r">
	    		<select v-model="taxType" @change="">
	    			<option value=0>แยกนอก</option>
	    			<option value=1>รวมใน</option>
	    			<option value=2>อัตราศูนย์</option>
	    		</select>
    		</div>
    	</div>
    	<div class="head-l1">
	    	<div class="headL-l1">
	    		วันที่เอกสาร :
	    	</div>
	    	<div class="headL-r1">
		    	<datepicker format="dd/MM/yyyy" style = "position: static; font-weight:normal; font-size:16px;" input-class="date" v-model="docDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDate" :disabled-picker="disabled"></datepicker>
	    	</div>  		
	    	<div class="headL-l1">
	    		ประเภทขนส่ง :
	    	</div>
	    	<div class="headL-r1">
	    		<select v-model="isConditionSend">
	    			<option value=0> รับเอง </option>
				    <option value=1> ส่งให้ </option>
				</select>
			</div>


    		<div class="headD-l">
    			รหัสลูกค้า :
    		</div>
    		<div class="headD-r">
				<input type="text" class="input" style="width:90%;" placeholder="รหัสลูกค้า" v-model="arCode" readonly>
				<i class="fa fa-search" aria-hidden="true" @click="searchCustomer" :disabled="detail_itemlists.length!=0"></i>
    		</div>
    		<div class="headD-l">
    			ชื่อลูกค้า :
    		</div>
    		<div class="headD-r">
    			<input type="text" placeholder="ชื่อลูกค้า" v-model="arName" readonly>
    		</div>

    	</div>
    	<!-- <div class="head-d">
    	</div> -->
    	<hr style="clear: both; margin: 9% 0 0 0;" />
		<div class="body-c">
			<div class="web-view">
				<table class="tableSection">
					<thead>
						<tr>
                            <th style="width: 60px; text-align: center;">ลำดับ</th>
                            <th style="width: 140px; text-align: center;">รหัสสินค้า</th>
                            <th style="width: 370px; text-align: center;">ชื่อสินค้า</th>
                            <th style="width: 100px; text-align: center;">คลัง/ชั้นเก็บ</th>
                            <th style="width: 100px; text-align: center;">หน่วยนับ</th>
                            <th style="width: 120px; text-align: center;" class="text">จำนวน</th>
                            <th style="width: 120px; text-align: center;" class="text">ราคา/หน่วย</th>
                            <th style="width: 120px; text-align: center;" class="text">ส่วนลด % ,บาท</th>
                            <th style="width: 120px; text-align: center;" class="text">จำนวนเงิน</th>
						</tr>
					</thead>
					<tbody>
	                    <tr v-for="item_list in detail_itemlists">
	                    	<td style="width: 50px; text-align:center;">{{ item_list.no }}</td>
	                    	<td style="width: 140px; text-align:left;">{{ item_list.item_code }}</td>
                            <td style="width: 400px; text-align:left;">{{ item_list.item_name }}</td>
                        	<td style="width: 100px; padding:0 0.5%; text-align:center;">
                    			<select v-bind="stock_list">
                            		<option v-for="wh in item_list.stock_list" :value="wh.wh_code" :selected="wh.wh_code == item_list.wh ? 'selected' : ''" style="cursor: pointer;">{{ wh.wh_code +"/"+ wh.shelf_code }}</option>
                            	</select>
                        	</td>
                        	<td style="width: 100px; padding:0 0.5%;">
                        		<select v-model="unit_list = item_list.unit_select"  style="cursor: pointer;" @change="calcItemAmount(item_list.no, unit_list, item_list.qty, '', item_list.discount, item_list.netAmountItem)">
                        			<option v-for="unit in item_list.units" :value="unit">{{ unit.unit_name }}</option>
                        		</select>
                        	</td>                       	
                        	<td style="padding:0;">
                        		<input type="text" v-model="item_list.qty" placeholder="0.00" @change="calcItemAmount(item_list.no, unit_list, item_list.qty, item_list.price, item_list.discount, item_list.netAmountItem)">
                        	</td>
                        	<td style="padding:0;">
                        		<input type="text" placeholder="0.00" :value="formatMoney(item_list.price)">
                        	</td>
                        	<td style="padding:0;">
                        		<input type="text" placeholder="0%, 0.00" :value="formatMoney(item_list.discount)">
                        	</td>
                        	<td style="padding:0;">
                        		<input type="text" placeholder="0.00" :value="formatMoney(item_list.netAmountItem)">
                        	</td>
	                    </tr>
					</tbody>
				</table>
				<button class="addItem" @click="searchItem">+</button>
				<div class="T-Desc">
					<input type="text" readonly="">	
				</div>
			</div>
		</div>
		<div class="buttom">
			<div class="buttom-l">
	    		<div class="headL-l2">
	    			รหัสพนักงาน :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="text" style ="width: 70%;" placeholder="รหัสพนักงาน" v-model="saleCode">
	    			<i class="material-icons" @click="searchSale">search</i>
	    		</div>
	    		<div class="headL-l2">
	    			ชื่อพนักงาน :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="text" readonly v-model="saleName">
	    		</div>
	    		<div class="headL-l2">
	    			ส่งของภายใน :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="number" min = "0" v-model="deliveryDay" @change="calcDueDate(1, deliveryDay)">
	    		</div>
	    		<div class="headL-l2">
	    			เครดิต(วัน) :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="number" min="0" v-model="creditDay" @change="calcDueDate(2, creditDay)">
	    		</div>
			</div>
			<div class="buttom-l">
	    		<div class="headL-l2">
	    			อ้างใบสั่งซื้อ :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="text" placeholder="เลขที่ใบสั่งซื้อ" v-model="poRefNo">
	    		</div>
	    		<div class="headL-l2">
	    			Job ID :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="text" placeholder="Job ID" v-model="jobId">
	    		</div>
	    		<div class="headL-l2">
	    			วันที่ส่งของ :
	    		</div>
	    		<div class="headL-r2">
	    			<datepicker format="dd/MM/yyyy" style = "position: static; font-weight:normal; font-size:16px;" input-class="date" v-model="deliveryDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDate" :disabled-picker="disabled"></datepicker>
	    		</div>
	    		<div class="headL-l2">
	    			ครบกำหนด :
	    		</div>
		    	<div class="headL-r2">
	    			<datepicker format="dd/MM/yyyy" style = "position: static; font-weight:normal; font-size:16px;" input-class="date" v-model="dueDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDate" :disabled-picker="disabled"></datepicker>
		    	</div>
			</div>
			<div class="buttom-l">
				<div class="headL-l2">
	    			แผนก :
	    		</div>
	    		<div class="headL-r2" v-model="departCode">
	    			<select>
	    				
	    			</select>
	    		</div>
	    		<div class="headL-l2">
	    			ผู้รับสินค้า :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="text" v-model="receiveName">
	    		</div>
	    		<div class="headL-l2">
	    			ทะเบียนรถ :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="text" v-model="carLicense">
	    		</div>
	    		<div class="headL-l2">
	    			เบอร์ผู้รับของ :
	    		</div>
	    		<div class="headL-r2">
	    			<input type="text" v-model="receiveTel">
	    		</div>
			</div>
			<div class="buttom-l1">
				<div class="buttomL1-l">
	    			หมายเหตุ :
	    		</div>
	    		<div class="buttomL1-r">
	    			<input type="text" placeholder="กรอกหมายเหตุ" v-model="myDescription">
	    		</div>	
			</div>
			</div>
			<div class="buttom-l2">
	    		<div class="headL-l">
	    			มูลค่าสินค้า :
	    		</div>
	    		<div class="headL-r">
	    			<input type="text" style="text-align:right;" readonly v-model="sumItemAmount">
	    		</div>
	    		<div class="headL-l">
	    			ส่วนลด %,บาท :
	    		</div>
	    		<div class="headL-r">
	    			<input type="text" style="text-align:right;" v-model="discountWord">
	    		</div>
	    		<div class="headL-l">
	    			ภาษีมูลค่าเพิ่ม :
	    		</div>
	    		<div class="headL-r">
	    			<input type="text" style="text-align:right;" readonly v-model="sumTaxAmount">
	    		</div>
	    		<div class="headL-l">
	    			มูลค่ารวมภาษี :
	    		</div>
	    		<div class="headL-r">
	    			<input type="text" style="text-align:right;" readonly v-model="sumItemAmount">
	    		</div>
			</div>

		    <md-speed-dial md-mode="scale" class="md-fab-bottom-right" style="position: fixed;">
				  <md-button class="md-fab" md-fab-trigger>
				    <md-icon md-icon-morph><i class="fa fa-times" aria-hidden="true"></i></md-icon>
				    <md-icon><i class="fa fa-th" aria-hidden="true"></i></md-icon>
				  </md-button>
				  <md-button class="md-fab md-mini md-clean" v-for="(tools, index) in tool_menu" @click="funcMenu(tools.func)" :key="index">
				    <md-icon><i :class="tools.icon" aria-hidden="true"></i></md-icon>
				  	<md-tooltip md-direction="left" style="font-size:14px;">{{ tools.text }}</md-tooltip>
				  </md-button>			  
			</md-speed-dial>
	</div>
	<div class="modal" id="mSearchItem">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <header class="modal-card-head">
	      <p class="modal-card-title">ค้นหาสินค้า</p>
	      <button class="delete" aria-label="close" @click="closeSearchItem"></button>
	    </header>
	    <section class="modal-card-body">
	      <div class="S-l">
	      	ค้นหา :
	      </div>
	      <div class="S-c">
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดินค้า" v-model="moSitem" @keyup.enter="searchItems(moSitem)">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info" @click="searchItem(keyword)">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div style="overflow:auto; height:450px;">
		      <div class="mo-list" v-for="items in item_lists" @click="selectItem(items)">
	    		<div class="mo-list-pic">
	    		</div>
		      	<div class="mo-list-detail">
	    			<p class="mo-Icon-title">รหัสสินค้า {{ items.item_code}} | {{ items.item_name }} </p>
	    			<p>ยอดคงเหลือ : {{ items.stock_qty }} | {{ items.unit_code }} </p>
	    			<p><span v-for="(stock, index) in items.stock_list"> <span v-show="index%2==1"> | </span><b>คลัง :</b>{{ stock.wh_code }} จำนวน {{ stock.qty }} {{ stock.unit_code }} </span></p>
	    			<p>ยอดค้างส่ง | ยอดค้างรับ| ยอดจองสินค้า</p>
	    			<p>ราคา : {{ items.price }} </p>
	    			<p>น้ำหนัก</p>
	    			<p>ค่าคอม/หน่วย</p>
		      	</div>
		      </div>
	      </div>
	    </section>
	  </div>
	</div>
	<div class="modal" id="mSearchCustomer">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <header class="modal-card-head">
	      <p class="modal-card-title">ค้นหาลูกค้า</p>
	      <button class="delete" aria-label="close" @click="closeSearchCustomer"></button>
	    </header>
	    <section class="modal-card-body">
	      <div class="S-l">
	      	ค้นหา :
	      </div>
	      <div class="S-c">
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดลูกค้า" v-model="moScus" @keyup.enter="searchCustomers(moScus)">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info" @click="searchCustomers(moScus)">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div style="overflow:auto; height:450px;">
		      <div class="mo-list" v-for="cus in customer_lists" @click="selectCustomer(cus)">
	    		<div class="mo-list-pic">
	    		</div>
		      	<div class="mo-list-detail">
		      		<p class="mo-list-title">{{ cus.ar_code }} : {{ cus.ar_name }}</p>
		      		<p>รหัสสมาชิก : {{ cus.id }}</p>
		      		<p>แต้ม : </p>
		      		<p>ที่อยู่ : {{ cus.address }}</p>
		      		<p>โทร. {{ cus.ar_telephone }}</p>
		      	</div>
		      </div>
	      </div>
	    </section>
	  </div>
	</div>
	<div class="modal" id="mSearchSale">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <header class="modal-card-head">
	      <p class="modal-card-title">ค้นหาพนักงานขาย</p>
	      <button class="delete" aria-label="close" @click="closeSearchSale"></button>
	    </header>
	    <section class="modal-card-body">
	      <div class="S-l">
	      	ค้นหา :
	      </div>
	      <div class="S-c">
	      	<input type="text" class="input" placeholder="กรุณากรอกพนักงานขายที่ต้องการค้นหา" v-model="moScus" @keyup.enter="searchSales(moSsale)">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info" @click="searchSales(moSsale)">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div style="overflow:auto; height:450px;">
		      <div class="mo-list" v-for="sale in sale_lists" @click="selectSale(sale)">
	    		<div class="mo-list-pic">
	    		</div>
		      	<div class="mo-list-detail">
		      		<p class="mo-list-title">{{ sale.sale_code }} : {{ sale.sale_name }}</p>
					<p>โทรศัพท์ : {{ sale.sale_telephone }}  </p>
					<p>สังกัดหน่วยงาน : {{ sale.profit_center }}</p>
		      	</div>
		      </div>
	      </div>
	    </section>
	  </div>
	</div>
<!-- 	<md-speed-dial md-mode="scale" class="md-fab-bottom-right" style="position: fixed;">
	  <md-button class="md-fab" md-fab-trigger>
	    <md-icon md-icon-morph><i class="fa fa-times" aria-hidden="true"></i></md-icon>
	    <md-icon><i class="fa fa-th" aria-hidden="true"></i></md-icon>
	  </md-button>

	  <md-button class="md-fab md-mini md-clean" @click="">
	    <md-icon><i class="fa fa-power-off" aria-hidden="true"></i></md-icon>
	  	<md-tooltip md-direction="left" style="font-size:14px;">ย้อนกลับ</md-tooltip>
	  </md-button>			  

	  <md-button class="md-fab md-mini md-clean" @click="">
	    <md-icon><i class="fa fa-plus" aria-hidden="true"></i></md-icon>
	    <md-tooltip md-direction="left" style="font-size:14px;">สร้างเอกสารใหม่</md-tooltip>
	  </md-button>

	  <md-button class="md-fab md-mini md-clean">
	    <md-icon><i class="fa fa-question" aria-hidden="true"></i></md-icon>
	    <md-tooltip md-direction="left" style="font-size:14px;">คู่มือ</md-tooltip>
	  </md-button>
	</md-speed-dial> -->

  </div>
</template>

<script src="../../js/SO/so.js"></script>
