<template>
  <div class="Qtd">
  	<div class="Cont">
	    <div class="T-r">
	    	<div class="Tr-l">
	    		ราคารวมทั้งหมด <p>
	    		<i class="fa fa-money" aria-hidden="true"></i>
	    		</p>
	    	</div>
	    	<div class="Tr-r">
	    		30,000,000 ฿
	    	</div>
	    	<div class="status">
	    		Status :
	    	</div>
	    </div>
	    <div class="T-l">
	    	<div class="lb-l">
	    		เลขที่เอกสาร 
	    	</div>
	    	<div class="lb-r">
	    		<input type="text" class="input" placeholder="เลขที่เอกสาร ...">
	    	</div>
	    	<div class="lb-l">
	    		ประเภทภาษี
	    	</div>
	    	<div class="lb-r">
	    		<select>
	    			<option>แยกนอก</option>
	    			<option>รวมใน</option>
	    			<option>อัตราศูนย์</option>
	    		</select>
	    	</div>
	    	<div class="lb-l">
	    		ประเภทราคา
	    	</div>
	    	<div class="lb-r">
	    		<select>
	    			<option>ขายสด</option>
	    			<option>ขายเชื่อ</option>
	    		</select>
	    	</div>
	    </div>
	    <div class="T-l">
	    	<div class="lb-l">
	    		วันที่เอกสาร 
	    	</div>
	    	<div class="lb-r">
	    		<input type="date" class="input">
	    	</div>
	    	<div class="lb-l">
	    		รหัสลูกค้า
	    	</div>
	    	<div class="lb-r">
	    		<input type="text" class="input" style="width:70%;" placeholder="รหัสลูกค้า ...">
	    		<i class="fa fa-search" aria-hidden="true" @click="SearchCusto"></i>
	    	</div>
	    	<div class="lb-l">
	    		ชื่อลูกค้า
	    	</div>
	    	<div class="lb-r">
	    		<input type="text" class="input" placeholder="ชื่อลูกค้า...">
	    	</div>
	    </div>
	    <hr style="clear:both; margin: 0% 2% 0.5% 2%;" />
	    <div class="QT-body">
	    	<div id="web-view">
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
                            <tr>
                            	<td style="width: 50px; text-align:center;">1</td>
                            	<td style="width: 200px; text-align:left;">2120250</td>
                            	<td style="width: 290px; text-align:left;">น้ำยาเชื่อมท่อ</td>
                            	<td style="width: 150px; padding:0 0.5%;">
                            		<select>
                            			<option>กระป๋อง</option>
                            			<option>กล่อง</option>
                            		</select>
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" placeholder="0.00">
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" placeholder="0.00">
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" placeholder="0%, 0.00">
                            	</td>
                            	<td style="padding:0;">
                            		<input type="text" placeholder="0.00">
                            	</td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="button is-medium" style="width:100%; border:0;" @click="SearchItem">
                       <i class="fa fa-plus-circle is-large" aria-hidden="true"></i>
                    </button>
	    	</div>
	    </div>
	    <div class="Dstock">
	    	<div class="stItem">
	    		ยอดคงเหลือ : 
	    	</div>
	    	<div class="weightItem">
	    		น้ำหนักรวม :
	    	</div>
	    </div>
	    <div class="btt">
	    	<div class="btt-block">
	    		<div class="lb-l">
	    		รหัสพนักงาน
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" style="width:70%; text-align:left;" placeholder="รหัสพนักงาน...">
		    		<i class="fa fa-search" aria-hidden="true" @click="SearchEmplo"></i>
		    	</div>
		    	<div class="lb-l">
		    		ชื่อพนักงาน
		    	</div>
		    	<div class="lb-r">
		    		<input type="text" class="input" placeholder="ชื่อพนักงาน..." style="text-align:left;">
		    	</div>		    	
		    	<div class="tarea">
		    		หมายเหตุ 1
		    	</div>
		    	<textarea rows="3">
		    		
		    	</textarea>
		    	<div class="tarea">
		    		หมายเหตุ 2
		    	</div>
		    	<textarea rows="3">
		    		
		    	</textarea>
	    	</div>
	    	<div class="btt-block">
	    		<div class="lb-l" style="width:50%">
		    		ยืนราคา
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="ยืนราคา...">
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		ลูกค้าต้องรับภายใน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="ลูกค้าต้องรับภายใน...">
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		เอกสารหมดอายุภายใน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="เอกสารหมดอายุภายใน...">
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		ส่งมอบภายใน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="ส่งมอบภายใน...">
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		เครดิต | วัน
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="number" class="input" placeholder="เครดิต...">
		    	</div>
	    	</div>
	    	<div class="btt-block">
	    		<div class="lb-l" style="width:50%">
		    		เงื่อนไขขนส่ง
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<select>
		    			<option>รับเอง</option>
		    			<option>ส่งให้</option>
		    		</select>
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		คำตอบจากลูกค้า
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<select>
		    			<option>รอตอบกลับ</option>
		    			<option>ตอบกลับแล้ว</option>
		    			<option>ไม่รับราคา</option>
		    		</select>
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		วันที่หมดอายุ
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="date" class="input">
		    	</div>
		    	<div class="lb-l" style="width:50%">
		    		ลงวันที่
		    	</div>
		    	<div class="lb-r" style="width:50%">
		    		<input type="date" class="input">
		    	</div>
	    	</div>
	    	<div class="btt-block" style="border:0;">
	    		<div class="lb-l" style="width:45%">
		    		รวมมูลค่าสินค้า
		    	</div>
		    	<div class="lb-r" style="width:55%">
		    		<input type="text" class="input" placeholder="รวมมูลค่าสินค้า...">
		    	</div>
		    	<div class="lb-l" style="width:45%">
		    		อัตราภาษีมูลค้าเพิ่ม
		    	</div>
		    	<div class="lb-r" style="width:55%">
		    		<input type="text" class="input" placeholder="7 % ">
		    	</div>
		    	<div class="lb-l" style="width:45%">
		    		ภาษีมูลค่าเพิ่ม
		    	</div>
		    	<div class="lb-r" style="width:55%">
		    		<input type="text" class="input" placeholder="ภาษีมูลค่าเพิ่ม..">
		    	</div>
		    	<div class="lb-l" style="width:45%">
		    		ส่วนลด %, บาท
		    	</div>
		    	<div class="lb-r" style="width:55%">
		    		<input type="text" class="input" placeholder="ส่วนลด, บาท..">
		    	</div>
	    	</div>
	    </div>
    </div>

<!-- modal item -->
    <div class="modal" id="SItem">
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
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดสินค้า">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div class="mo-list">
	      	<div class="mo-list-img">
	      		<img src="../assets/logo.png">
	      	</div>
	      	<div class="mo-list-detail">
	      		<p class="mo-list-title">รหัส : ชื่อ</p>
	      		<p>คลัง : </p>
	      		<p>ยอดค้างส่ง | ยอดค้างรับ | ยอดจองสินค้า</p>
	      		<p>ราคา : </p>
	      		<p>My Grade </p>
	      	</div>
	      </div>
	       <div class="mo-list">
	      	<div class="mo-list-img">
	      		<img src="../assets/logo.png">
	      	</div>
	      	<div class="mo-list-detail">
	      		<p class="mo-list-title">รหัส : ชื่อ</p>
	      		<p>คลัง : </p>
	      		<p>ยอดค้างส่ง | ยอดค้างรับ | ยอดจองสินค้า</p>
	      		<p>ราคา : </p>
	      		<p>My Grade </p>
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
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดลูกค้า">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div class="mo-list">
	      	<div class="mo-list-img">
	      		<img src="../assets/logo.png">
	      	</div>
	      	<div class="mo-list-detail">
	      		<p class="mo-list-title">รหัส : ชื่อ</p>
	      		<p>รหัสสมาชิก : </p>
	      		<p>แต้ม : </p>
	      		<p>ที่อยู่ : </p>
	      		<p>โทร. </p>
	      	</div>
	      </div>
	       <div class="mo-list">
	      	<div class="mo-list-img">
	      		<img src="../assets/logo.png">
	      	</div>
	      	<div class="mo-list-detail">
	      		<p class="mo-list-title">รหัส : ชื่อ</p>
	      		<p>รหัสสมาชิก : </p>
	      		<p>แต้ม : </p>
	      		<p>ที่อยู่ : </p>
	      		<p>โทร. </p>
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
	      	<input type="text" class="input" placeholder="กรุณากรอกรายละเอียดพนักงาน">
	      </div>
	      <div class="S-r">
	      	<button class="button is-info">
		      	<span class="icon">
				  <i class="fa fa-search"></i>
				</span>&nbsp;
				ค้นหา
			</button>
	      </div>
	      <hr style="clear:both; width:100%; margin-bottom:0.5%;">
	      <div class="mo-list" style="height:120px;">
	      	<div class="mo-list-img" style="height:120px; width: 120px;">
	      		<img src="../assets/logo.png">
	      	</div>
	      	<div class="mo-list-detail">
	      		<p class="mo-list-title">รหัส : ชื่อ</p>
	      		<p>commition : </p>
	      		<p>team : </p>
	      	</div>
	      </div>
	       <div class="mo-list" style="height:120px;">
	      	<div class="mo-list-img" style="height:120px; width: 120px;">
	      		<img src="../assets/logo.png">
	      	</div>
	      	<div class="mo-list-detail">
	      		<p class="mo-list-title">รหัส : ชื่อ</p>
	      		<p>commition : </p>
	      		<p>team : </p>
	      	</div>
	      </div>
	    </section>
	  </div>
	</div>
<!-- modal item -->
  </div>
</template>

<script src="../js/qtd.js"></script>