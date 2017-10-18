<template>
  <div class="Qtd">
  	<div class="Cont">
	    <div class="T-r">
	    	<div class="Tr-l">
	    		ราคารวมทั้งหมด <br>
	    		<i class="fa fa-money" aria-hidden="true"></i>
	    	</div>
	    	<div class="Tr-r">
	    		{{ formatMoney(billnetAmount) }} ฿
	    	</div>
	    	<div class="status">
	    		Status : 
	    		<span style="color: blue; font-size: 20px; line-height:40px;" v-show="this.params.status == 0"> ** เอกสารใหม่</span>
	    		<span style="color: green; font-size: 20px; line-height:40px;" v-show="is_confirm==1">อนุมัติแล้ว</span>
	    		<span style="color: red; font-size: 20px; line-height:40px;" v-show="is_cancel == 1">ยกเลิกแล้ว</span>
	    		<span style="color: #000; font-size: 20px; line-height:40px;" v-show="this.params.status==1&&is_confirm==0&&is_cancel==0"> ** เปลี่ยนแปลงข้อมูลบางส่วนได้</span>
	    	</div>
	    </div>
	    <div class="T-l">
	    	<div class="lb-l">
	    		เลขที่เอกสาร 
	    	</div>
	    	<div class="lb-r">
	    		<input type="text" class="input" placeholder="เลขที่เอกสาร ..." :value="DocNo" readonly>
	    	</div>
	    	<div class="lb-l">
	    		ประเภทภาษี
	    	</div>
	    	<div class="lb-r">
	    		<select v-model="vatType" @change="calVatnetAmount()" :disabled="detail_itemlists.length!=0">
	    			<option value="1">แยกนอก</option>
	    			<option value="2">รวมใน</option>
	    			<option value="3">อัตราศูนย์</option>
	    		</select>
	    	</div>
	    	<div class="lb-l">
	    		ประเภทราคา
	    	</div>
	    	<div class="lb-r">
	    		<select v-model="billType" :disabled="detail_itemlists.length!=0">
	    			<option value="1">ขายสด</option>
	    			<option value="2">ขายเชื่อ</option>
	    		</select>
	    	</div>
	    </div>
	    <div class="T-l">
	    	<div class="lb-l" style="padding-left:0;">
	    		วันที่ออกเอกสาร 
	    	</div>
	    	<div class="lb-r">
	    		<datepicker format="dd/MM/yyyy" input-class="input date" v-model="DocDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDate" :disabled-picker="docdata_disabled" style="position: static;" @input="setDocDate(DocDate)"></datepicker>
	    	</div>
	    	<div class="lb-l">
	    		รหัสลูกค้า
	    	</div>
	    	<div class="lb-r">
	    		<input type="text" class="input" style="width:70%;" placeholder="รหัสลูกค้า ..." v-model="ArCode" readonly @click="SearchCusto" :disabled="detail_itemlists.length!=0">
	    		<i class="fa fa-search" aria-hidden="true" @click="SearchCusto" :disabled="detail_itemlists.length!=0 || is_cancel == 1 || is_confirm == 1"></i>
	    	</div>
	    	<div class="lb-l">
	    		ชื่อลูกค้า
	    	</div>
	    	<div class="lb-r">
	    		<input type="text" class="input" placeholder="ชื่อลูกค้า..." v-model="ArName" readonly @click="SearchCusto" :disabled="detail_itemlists.length!=0">
	    	</div>
	    </div>
	    <hr style="clear:both; margin: 0% 2% 0.5% 2%;" />
	    <div class="body-c">
	    	<div class="web-view">
	    		 <table class="tableSection">
                        <thead>
                            <tr>
                                <th style="width: 50px; text-align: center;"></th>
                                <th style="width: 200px; text-align: center;">รหัสสินค้า</th>
                                <th style="width: 290px; text-align: center;">ชื่อสินค้า</th>
                                <th style="width: 150px; text-align: center;">หน่วยนับ</th>
                                <th style="width: 145px; text-align: center;" class="text">จำนวน</th>
                                <th style="width: 150px; text-align: center;" class="text">ราคา/หน่วย</th>
                                <th style="width: 150px; text-align: center;" class="text">ส่วนลด % ,บาท</th>
                                <th style="width: 150px; text-align: center;" class="text">จำนวนเงิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item_list, index) in sortedList" @dblclick="selectTR(item_list)" class="item_list_label" @click="show_stock(index, item_list)">
                            	<td style="width: 50px; text-align:center;" v-touch @hold.preventDefualt="delete_item(index)" >{{ item_list.no }}</td>
                            	<td style="width: 200px; text-align:left;" v-touch @hold.preventDefualt="delete_item(index)">{{ item_list.item_code }}</td>
                            	<td style="width: 290px; text-align:left;" v-touch @hold.preventDefualt="delete_item(index)">{{ item_list.item_name }}</td>
                            	<td style="width: 150px; padding:0 0.5%;">
                            		<select v-model="unit_list = item_list.unit_select"  style="cursor: pointer;" @change="calNetAmount(item_list.no, unit_list, item_list.qty, '', item_list.discount, item_list.netAmountItem)" class="item_list_select">
                            			<option v-for="unit in item_list.units" :value="unit">{{ unit.unit_name }}</option>
                            		</select>
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" v-model="item_list.qty" placeholder="0.00" @change="calNetAmount(item_list.no, unit_list, item_list.qty, item_list.price, item_list.discount, item_list.amount)" @click="return_Int_Item(index, item_list.qty, '', '')" @focus="return_Int_Item(index, item_list.qty, '', '')" @blur="return_FM_Item(index, item_list.qty, item_list.price, item_list.discount)" :readonly="is_confirm==1||is_cancel==1" class="item_list_input1" @keydown="keyNumber">
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" placeholder="0.00" v-model="item_list.price" @change="calNetAmount(item_list.no, unit_list, item_list.qty, item_list.price, item_list.discount, item_list.amount)" @click="return_Int_Item(index, '', item_list.price, '')" @focus="return_Int_Item(index, '', item_list.price, '')" @blur="return_FM_Item(index, item_list.qty, item_list.price, item_list.discount)" :readonly="is_confirm==1||is_cancel==1" class="item_list_input2" @keydown="keyNumber">
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" placeholder="0%, 0.00" v-model="item_list.discount" @change="calNetAmount(item_list.no, unit_list, item_list.qty, item_list.price, item_list.discount, item_list.amount)" @click="return_Int_Item(index, '', '', item_list.discount)" @focus="return_Int_Item(index, '', '', item_list.discount)" @blur="return_FM_Item(index, item_list.qty, item_list.price, item_list.discount)" :readonly="is_confirm==1||is_cancel==1"  class="item_list_input3" @keydown="keyNumber">
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" placeholder="0.00" v-model="item_list.amount" readonly  class="item_list_input4">
                            	</td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="button is-medium" style="width:100%; border:0;" @click="SearchItem" :disabled="is_confirm==1||is_cancel==1">
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
		    		<input type="text" class="input" style="width:70%; text-align:left;" placeholder="รหัสพนักงาน..." readonly v-model="EmpCode">
		    		<i class="fa fa-search" aria-hidden="true" @click="SearchEmplo"></i>
		    	</div>
		    	<div class="lb-l">
		    		ชื่อพนักงาน
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="ชื่อพนักงาน..." style="text-align:left;" v-model="EmpName" readonly>
		    	</div>		    	
		    	<div class="tarea">
		    		หมายเหตุ 1
		    	</div>
		    	<textarea rows="3" v-model="discription1" :readonly="is_confirm==1||is_cancel==1">
		    		
		    	</textarea>
		    	<div class="tarea">
		    		หมายเหตุ 2
		    	</div>
		    	<textarea rows="3" v-model="discription2" :readonly="is_confirm==1||is_cancel==1">
		    		
		    	</textarea>
	    	</div>
	    	<div class="btt-block">
	    		<div class="lb-l" style="width:50%">
		    		ยืนราคา
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="ยืนราคา..." v-model="sendpriceDay" min="1" :readonly="is_confirm==1||is_cancel==1" @keydown="keyInt" @blur="sendpriceDay_lessone_day(sendpriceDay)">
		    	</div>
		    	<!-- <div class="lb-l" style="width:50%">
		    		ลูกค้าต้องรับภายใน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="ลูกค้าต้องรับภายใน..." v-model="reciveDay" min="1">
		    	</div> -->
		    	<div class="lb-l" style="width:50%">
		    		เอกสารหมดอายุภายใน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="เอกสารหมดอายุภายใน..." v-model="expDay" @blur="expDay_lessone_day(expDay)" min="1" :readonly="is_confirm==1||is_cancel==1" @keydown="keyInt">
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		ส่งมอบภายใน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="ส่งมอบภายใน..." v-model="sendDay" @blur="sendDay_lessone_day(sendDay)" min="1" :readonly="is_confirm==1||is_cancel==1" @keydown="keyInt">
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		เครดิต | วัน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="เครดิต..." v-model="creditDay" readonly>
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		คำตอบจากลูกค้า
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<select v-model="custo_assert" :disabled="is_confirm==1||is_cancel==1">
		    			<option value="1">รอตอบกลับ</option>
		    			<option value="2">ตอบกลับแล้ว</option>
		    			<option value="3">ไม่รับราคา</option>
		    		</select>
		    	</div>
	    	</div>
	    	<div class="btt-block">
	    		<div class="lb-l" style="width:50%">
		    		เงื่อนไขขนส่ง
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<select v-model="isConditionSend" :disabled="detail_itemlists.length!=0" >
		    			<option value="0">รับเอง</option>
		    			<option value="1">ส่งให้</option>
		    		</select>
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		วันที่หมดอายุ
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<datepicker format="dd/MM/yyyy" input-class="input date" v-model="ExpDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDocDate" :disabled-picker="is_confirm==1||is_cancel==1" @input="calExpDay(ExpDate)"></datepicker>
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		ลงวันที่
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<datepicker format="dd/MM/yyyy" input-class="input date" v-model="deliveryDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDocDate" :disabled-picker="is_confirm==1||is_cancel==1" v-on:input="calDeliDay(deliveryDate)"></datepicker>
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		วันที่ครบกำหนด
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<datepicker format="dd/MM/yyyy" input-class="input date" v-model="dueDate" required language="th" calendar-button-icon="fa fa-calendar" calendar-button :disabled="nowDocDate" disabled-picker v-on:input="calcreditDay(dueDate)"></datepicker>
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
			  	<md-tooltip md-delay="0" md-direction="left" style="font-size:14px;">{{ tools.text }}</md-tooltip>
			  </md-button>			  

			  <!-- <md-button class="md-fab md-mini md-clean" @click="insert_QT">
			    <md-icon><i class="fa fa-pencil-square-o" aria-hidden="true"></i></md-icon>
			    <md-tooltip md-direction="left" style="font-size:14px;">บันทึกเอกสาร</md-tooltip>
			  </md-button>

			  <md-button class="md-fab md-mini md-clean">
			    <md-icon><i class="fa fa-question" aria-hidden="true"></i></md-icon>
			    <md-tooltip md-direction="left" style="font-size:14px;">คู่มือ</md-tooltip>
			  </md-button> -->
			</md-speed-dial>

    </div>

<!-- modal item -->
    <div class="modal" id="SItem" style="overflow:hidden">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <header class="modal-card-head">
	      <p class="modal-card-title">ค้นหาสินค้า</p>
	      <button class="delete" aria-label="close" @click="CSItem"></button>
	    </header>
	    <section class="modal-card-body">

	      <div class="S-l">
	      	ค้นหา :
	      </div>
	      <div class="S-c">
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดสินค้า" v-model="moSitem" @keyup.enter="searchItems(moSitem)">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info" @click="searchItems(moSitem)">
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
<!-- modal item -->

<!-- modal Custo -->
    <div class="modal" id="SCusto">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <header class="modal-card-head">
	      <p class="modal-card-title">ค้นหาลูกค้า</p>
	      <button class="delete" aria-label="close" @click="CSCusto"></button>
	    </header>
	    <section class="modal-card-body">
	      <div class="S-l">
	      	ค้นหา :
	      </div>
	      <div class="S-c">
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดลูกค้า" v-model="moScus" @keyup.enter="searchCus(moScus)">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info" @click="searchCus(moScus)">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div style="overflow:auto; height:450px;">
		      <div class="mo-list" v-for="cus in customer_lists" @click="selectCus(cus)">
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
<!-- modal Custo -->

<!-- modal Emplo -->
    <div class="modal" id="SEmplo">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <header class="modal-card-head">
	      <p class="modal-card-title">ค้นหาพนักงาน</p>
	      <button class="delete" aria-label="close" @click="CSEmplo"></button>
	    </header>
	    <section class="modal-card-body">
	      <div class="S-l">
	      	ค้นหา :
	      </div>
	      <div class="S-c">
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดพนักงาน" @keyup.enter="searchEmp(moSemp)" v-model="moSemp">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info" @click="searchEmp(moSemp)">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div style="overflow:auto; height:450px;">
		      <div class="mo-list" style="height:120px;" v-for="emp in employee_lists" @click="selectEmp(emp)">
		      	<div class="mo-list-img" style="height:120px; width: 120px;">
		      		<img src="../../assets/logo.png">
		      	</div>
		      	<div class="mo-list-detail">
		      		<p class="mo-list-title">{{ emp.sale_code }} : {{ emp.sale_name }}</p>
		      		<p>commition : </p>
		      		<p>team : {{ emp.profit_center }}</p>
		      	</div>
		      </div>
	      </div>
	    </section>
	  </div>
	</div>
<!-- modal Emplo -->

<!-- modal Price item -->
    <div class="modal" id="Price_item">
	  <div class="modal-background"></div>
	  <div class="modal-content">
	    <header class="modal-card-head" style="position: fixed; width: 80%;">
	      <p class="modal-card-title">ราคาสินค้าของ {{ check_price }}</p>
	      <button class="delete" aria-label="close" @click="closeTR"></button>
	    </header>
	    <section class="modal-card-body" style="overflow: auto; margin-top: 7%;">
	      <table class="table">
	      	<tr>
	      		<th>หน่วยนับ</th>
	      		<th>ประเภทการขาย</th>
	      		<th>ประเภทภาษี</th>
	      		<th>ราคา (1)</th>
	      		<th>ราคา (2)</th>
	      		<th>ราคา (3)</th>
	      		<th>ราคา (4)</th>
	      		<th>ประเภทการขนส่ง</th>
	      		<th>จำนวน</th>
	      	</tr>
	      	<tr v-for="price in price_lists">
	      		<td>{{ price.unit }}</td>
	      		<td>{{ price.sale_type }}</td>
	      		<td>{{ price.tax_type }}</td>
	      		<td>{{ formatMoney(price.price1) }}</td>
	      		<td>{{ formatMoney(price.price2) }}</td>
	      		<td>{{ formatMoney(price.price3) }}</td>
	      		<td>{{ formatMoney(price.price4) }}</td>
	      		<td>{{ price.transfer }}</td>
	      		<td>{{ price.qty }}</td>
	      	</tr>
	      </table>
	    </section>
	  </div>
	</div>
<!-- modal Price item -->

  </div>
</template>

<script src="../../js/QT/qtd.js"></script>