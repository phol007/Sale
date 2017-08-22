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
	    		<i class="fa fa-search" aria-hidden="true"></i>
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
		    		<i class="fa fa-search" aria-hidden="true"></i>
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
  </div>
</template>

<script src="../js/qtd.js"></script>