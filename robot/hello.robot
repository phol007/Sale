*** Settings ***
Resource    setting.robot
Resource    POM/ค้นหา.robot
Test Teardown    ปิดหน้าเบราเซอร์
Test Template    ค้นคำจาก URL แล้วเจอคำที่อยากได้

*** Test Cases ***
# function or Arguments                    parameter1   parameter2
ค้นคำจาก URL แล้วเจอคำที่อยากได้ นพดลพานิช    นพดลพานิช    สร้างรากฐานให้ชีวิต
ค้นคำจาก URL แล้วเจอคำที่อยากได้ rov   rov    ฮีโร่
