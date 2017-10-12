<template>
	<div class="saleorder">
      <div class="Cont">
    	<div class="T-r" style="width: 40%;">
    		<div class="Tr-l" style="font-size: 20px;">
    			ราคารวมทั้งหมด
	      		<br>
	      		<i class="fa fa-money" aria-hidden="true"></i>
    		</div>
    		<div class="Tr-r" style="font-size: 45px;">
    			{{ billnetAmount }} ฿
    		</div>   
			<div class="status">
		     	<b>Status : 
		     	<span style="color: green; font-size: 14px; line-height:40px;" v-show="is_confirm==1">อนุมัติแล้ว</span>
	    		<span style="color: red; font-size: 14px; line-height:40px;" v-show="is_cancel == 1">ยกเลิกแล้ว</span>
	    		<span style="color: #000; font-size: 14px; line-height:40px;" v-show="is_confirm==0&&is_cancel==0">New</span>
	    		</b>
		    </div> 		
    	</div>
    	<div class="T-l" style="width: 20%;">	
    		<div class="lb-l" style="font-size: 12px;">
    			เลขที่เอกสาร 
    		</div>
    		<div class="lb-r">
    			<input type="text" class="input" placeholder="เลขที่เอกสาร ..." :value="docNo" readonly style="font-size: 12px;">
    		</div>
    		<div class="lb-l" style="font-size: 12px;">
    		ประภทขาย 
    		</div>
    		<div class="lb-r">
    			<select v-model="billType" @change="" style="font-size: 12px;">
    			<option value=0> ขายสินค้าเงินสด </option>
			    <option value=1> ขายสินค้าเงินเชื่อ </option>
			   </select>
    		</div>
    		<div class="lb-l" style="font-size: 12px;">
    			ประเภทภาษี 
    		</div>
    		<div class="lb-r">
	    		<select v-model="vatType" @change="" style="font-size: 12px;">
	    			<option value="0">แยกนอก</option>
	    			<option value="1">รวมใน</option>
	    			<option value="2">อัตราศูนย์</option>
	    		</select>
    		</div>
    	</div>

    	<div style="width: 40%; float:left; margin-top: 0.5%;">    

    	<div style="width: 50%; float: left;">
	    	<div class="lb-l" style="font-size: 12px;">
	    		วันที่เอกสาร 
	    	</div>
	    	<div class="lb-r" ar>
		    	<datepicker format="dd/MM/yyyy" style = "position: static; font-weight:normal; font-size:12px; border:0;" input-class="date" v-model="docDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDate" :disabled-picker="disabled"></datepicker>
	    	</div>
   		</div>
    	<div style="width: 50%; float: left;">    		  		
	    	<div class="lb-l" style="font-size: 12px;">
	    		ประเภทขนส่ง 
	    	</div>
	    	<div class="lb-r">
	    		<select v-model="isConditionSend" style="font-size: 12px;">
	    			<option value=0> รับเอง </option>
				    <option value=1> ส่งให้ </option>
				</select>
			</div>
    	</div>		 	
    		<div class="lb-l" style="width: 30%; font-size: 12px; padding:1.5%;">
    			รหัสลูกค้า :
    		</div>
    		<div class="lb-r" style="width: 70%;">
				<input type="text" class="input" style="width:80%; font-size: 12px;" placeholder="รหัสลูกค้า" v-model="arCode" readonly>
				<i class="fa fa-search" aria-hidden="true" @click="searchCustomer" :disabled="detail_itemlists.length!=0" style="margin:0.5%;"></i>
    		</div>
    		<div class="lb-l" style="font-size: 12px; width: 30%; padding:1.5%;">
    			ชื่อลูกค้า :
    		</div>
    		<div class="lb-r" style="width: 70%;">
    			<input type="text" placeholder="ชื่อลูกค้า" v-model="arName" readonly style="font-size: 12px; height: 100%; width: 100%; border:0;">
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
	                    <tr v-for="(item_list, index) in detail_itemlists" @dblclick="selectTR(item_list)" class="item_list_label" @click="show_stock(index, item_list)">
	                    	<td style="width: 50px; text-align:center;">{{ item_list.no }}</td>
	                    	<td style="width: 140px; text-align:left;">{{ item_list.item_code }}</td>
                            <td style="width: 400px; text-align:left;">{{ item_list.item_name }}</td>
                        	<td style="width: 100px; padding:0 0.5%; text-align:center;">
                    			<select v-model="stock_list = item_list.stock_select" @change="calcItemAmount(item_list.no, unit_list, item_list.qty, '', item_list.discount, item_list.netAmountItem, stock_list)">
                            		<option v-for="wh in item_list.stock_list" :value="wh" style="cursor: pointer;">{{ wh.wh_code +"/"+ wh.shelf_code }}</option>
                            	</select>
                        	</td>
                        	<td style="width: 100px; padding:0 0.5%;">
                        		<select v-model="unit_list = item_list.unit_select"  style="cursor: pointer;" @change="calcItemAmount(item_list.no, unit_list, item_list.qty, '', item_list.discount, item_list.netAmountItem, stock_list)">
                        			<option v-for="unit in item_list.units" :value="unit">{{ unit.unit_name }}</option>
                        		</select>
                        	</td>                       	
                        	<td style="padding:0;">
                        		<input type="text" v-model="item_list.qty" placeholder="0.00" @change="calcItemAmount(item_list.no, unit_list, item_list.qty, item_list.price, item_list.discount, item_list.netAmountItem, stock_list)" @click="return_Int_Item(index, item_list.qty, '', '')" @focus="return_Int_Item(index, item_list.qty, '', '')" @blur="return_FM_Item(index, item_list.qty, item_list.price, item_list.discount)">
                        	</td>
                        	<td style="padding:0;">
                        		<input type="text" placeholder="0.00" v-model="item_list.price" @change="calNetAmount(item_list.no, unit_list, item_list.qty, item_list.price, item_list.discount, item_list.netAmountItem, stock_list)" @click="return_Int_Item(index, '', item_list.price, '')" @focus="return_Int_Item(index, '', item_list.price, '')" @blur="return_FM_Item(index, item_list.qty, item_list.price, item_list.discount)">
                        	</td>
                        	<td style="padding:0;">
                        		<input type="text" placeholder="0%, 0.00" v-model="item_list.discount" @change="calNetAmount(item_list.no, unit_list, item_list.qty, item_list.price, item_list.discount, item_list.netAmountItem, stock_list)" @click="return_Int_Item(index, '', '', item_list.discount)" @focus="return_Int_Item(index, '', '', item_list.discount)" @blur="return_FM_Item(index, item_list.qty, item_list.price, item_list.discount)">
                        	</td>
                        	<td style="padding:0;">
                        		<input type="text" placeholder="0.00" :value="formatMoney(item_list.netAmountItem)" readonly>
                        	</td>
	                    </tr>
					</tbody>
				</table>
				<button class="button is-medium" style="width:100%; border:0;" @click="searchItem">
                       <i class="fa fa-plus-circle is-large" aria-hidden="true"></i>
                </button>
			</div>
		</div>
		  <div class="Dstock">
	    	<div class="stItem">
	    		ยอดคงเหลือ : <span style="font-weight:normal; font-size:12px;" v-for="(stock, sindex) in stock_detail"><span v-show="sindex!=0" style="font-weight:bold;"> ,&nbsp;&nbsp;</span>{{stock.qty}} &nbsp;({{stock.unit_code}} | {{stock.wh_code}})</span>
	    	</div>
	    	<div class="weightItem">
	    		น้ำหนักรวม :  {{ formatMoney(weight_all) }}
	    	</div>
	    </div>

	    <div class="btt">
	    	<div class="btt-block">
	    		<div class="lb-l">
	    		รหัสพนักงาน
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" style="width:70%; text-align:left;" placeholder="รหัสพนักงาน..." readonly v-model="saleCode">
		    		<i class="fa fa-search" aria-hidden="true" @click="searchSale"></i>
		    	</div>
		    	<div class="lb-l">
		    		ชื่อพนักงาน
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="ชื่อพนักงาน..." style="text-align:left;" v-model="saleName" readonly>
		    	</div>
		    	<div class="lb-l">
		    		ส่งของ
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="ส่งของ..." style="text-align:left;" v-model="deliveryDay" readonly>
		    	</div>
		    	<div class="tarea">
		    		หมายเหตุ 
		    	</div>
		    	<textarea rows="3" v-model="myDescription" :readonly="is_confirm==1||is_cancel==1" placeholder="หมายเหตุ...">
		    		
		    	</textarea>
		    </div>

		    <div class="btt-block">
		    	<div class="lb-l">
		    		อ้างใบสั่งซื้อ :
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="เลขที่ใบสั่งซื้อ..." style="text-align:left;" v-model="poRefNo" readonly>
		    	</div>
		    	<div class="lb-l">
		    		Job ID :
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="Job ID..." style="text-align:left;" v-model="jobId" readonly>
		    	</div>		    	
		    	<div class="lb-l" style="width:40%">
		    		เครดิต | วัน
		    	</div>
		    	<div class="lb-r" style="width:60%">
		    		<input type="number" class="input" placeholder="เครดิต..." v-model="creditDay" readonly>
		    	</div>
		    	<div class="lb-l" style="width:40%">
		    		วันที่ส่งของ
		    	</div>
		    	<div class="lb-r" style="width:60%">
		    		<datepicker format="dd/MM/yyyy" input-class="input date" v-model="deliveryDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDocDate" :disabled-picker="is_confirm==1||is_cancel==1" @input="calExpDay(ExpDate)"></datepicker>
		    	</div>
		    	<div class="lb-l" style="width:40%">
		    		วันที่ครบกำหนด
		    	</div>
		    	<div class="lb-r" style="width:60%">
		    		<datepicker format="dd/MM/yyyy" input-class="input date" v-model="dueDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDocDate" :disabled-picker="is_confirm==1||is_cancel==1" v-on:input="calcreditDay(dueDate)"></datepicker>
		    	</div>
		    </div>


		    <div class="btt-block">
		    	<div class="lb-l">
		    		แผนก :
		    	</div>
		    	<div class="lb-r">
		    		<select v-model="departCode">
		    			<option></option>
		    			<option></option>
		    		</select>
		    	</div>
		    	<div class="lb-l">
		    		ผู้รับสินค้า :
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="ผู้รับสินค้า..." style="text-align:left;" v-model="receiveName" readonly>
		    	</div>	
		    	<div class="lb-l">
		    		ทะเบียนรถ :
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="ทะเบียนรถ..." style="text-align:left;" v-model="carLicense" readonly>
		    	</div>	
		    	<div class="lb-l">
		    		เบอร์ผู้รับ :
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="เบอร์ผู้รับ..." style="text-align:left;" v-model="receiveTel" readonly>
		    	</div>	
		    </div>

		    <div class="btt-block" style="border:0;">
	    		<div class="lb-l" style="width:45%">
		    		รวมมูลค่าสินค้า
		    	</div>
		    	<div class="lb-r" style="width:55%">
		    		<input type="text" class="input" placeholder="รวมมูลค่าสินค้า..." readonly v-model="totalItemAmount">
		    	</div>
		    	<div class="lb-l" style="width:45%">
		    		ส่วนลด %, บาท
		    	</div>
		    	<div class="lb-r" style="width:55%">
		    		<input type="text" class="input" placeholder="ส่วนลด, บาท.." v-model="billDiscount" @change="calVatnetAmount" @click="return_Int_Discount(billDiscount)" @focus="return_Int_Discount(billDiscount)" @blur="return_FM_Discount(billDiscount)" :readonly="is_confirm==1||is_cancel==1" @keydown="keyNumber">
		    	</div>
		    	<div class="lb-l" style="width:45%">
		    		อัตราภาษีมูลค้าเพิ่ม
		    	</div>
		    	<div class="lb-r" style="width:55%">
		    		<input type="text" class="input" placeholder="7" readonly style="width:20%" v-model="taxRage"><span style="margin-left:3%; line-height:40px; font-weight:bold;"> % &nbsp;= &nbsp;</span>
		    		<input type="text" class="input" placeholder="ภาษีมูลค่าเพิ่ม.." readonly v-model="netVatAmount" style="width:50%">
		    	</div>	    	
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
		      <div class="mo-list-img">
		      	<img :src="items.img_profile">
		      </div>
		      <div class="mo-list-detail">
		      	<p class="mo-list-title">{{ items.item_code }} : {{ items.item_name }}</p>
		      	<p style="width:100%; word-wrap: break-word;"><span v-for="(stock, index) in items.stock_list"> <span v-show="index%2==1"> | </span><b>คลัง :</b>{{ stock.wh_code }} จำนวน {{ stock.qty }} {{ stock.unit_code }} </span></p>
		      	<p>ยอดค้างส่ง {{ items.so_qty }} | ยอดค้างรับ {{ items.po_qty }} | ยอดจองสินค้า {{ items.ro_qty }} </p>
		      	<p>ราคา : {{ return_price(items.units) }}</span></p>
		      	<p>My Grade : {{ items.my_grade }}</p>
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
		      	<div class="mo-list-img">
		      		<img src="../../assets/logo.png">
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
	      	<input type="text" class="input" placeholder="กรุณากรอกพนักงานขายที่ต้องการค้นหา" v-model="moSsale" @keyup.enter="searchSales(moSsale)">
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
	    	<div class="mo-list" style="height:120px;" v-for="sale in sale_lists" @click="selectSale(sale)">
		      	<div class="mo-list-img" style="height:120px; width: 120px;">
		      		<img src="../../assets/logo.png">
		      	</div>
		      	<div class="mo-list-detail">
		      		<p class="mo-list-title">{{ sale.sale_code }} : {{ sale.sale_name }}</p>
		      		<p>commition : </p>
		      		<p>team : {{ sale.profit_center }}</p>
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
