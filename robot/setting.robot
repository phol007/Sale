*** Settings ***
Library    Selenium2Library

*** Variables ***
${URL}    http://www.google.com
${Browser}    gc

*** Keywords ***
เปิดเบราเซอร์แล้วพิมพ์ URL
    Open Browser    ${URL}    ${Browser}

ปิดหน้าเบราเซอร์
    Close Browser
