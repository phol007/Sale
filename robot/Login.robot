*** Settings ***
Resource    setting.robot
Resource    POM/test_login.robot
Test Template    กรอก Username and Password แล้วเจอ คำว่า Quotation
Test Teardown    ปิดหน้าเบราเซอร์

*** Test Cases ***
พี่ทอม login ด้วย username tom และ pwd 1234 แล้ว สามารถเข้าสู่ระบบได้       tom         1234    Quotation
พี่บี login ด้วย username liverbee และ pwd 1234 แล้ว สามารถเข้าสู่ระบบได้้    liverbee    1234    Quotation
พี่ทอม login ด้วย username tom และ pwd 1111 แล้ว แจ้งเตือน 404            tom         1111    404
พี่ทอม login ด้วย username tom1 และ pwd 1234 แล้ว แจ้งเตือน 404           tom1        1234    404
