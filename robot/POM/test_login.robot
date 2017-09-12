*** Variables ***
${ช่อง Username}    //*[@id="app"]/div[1]/div/div[2]/form/div[1]/p/input
${ช่อง Password}    //*[@id="app"]/div[1]/div/div[2]/form/div[2]/p/input
${ปุ่ม login}    //*[@id="app"]/div[1]/div/div[2]/form/div[3]/p/button

*** Keywords ***
กรอก Username and Password แล้วเจอ คำว่า Quotation
    [Arguments]    ${username}    ${pwd}    ${output}
    เปิดเบราเซอร์แล้วพิมพ์ URL
    กรอก Username    ${username}
    กรอก Password    ${pwd}
    กดปุ่ม login
    จะพบข้อความ   ${output}

กรอก Username
    [Arguments]    ${username}
    Input Text    ${ช่อง Username}     ${username}

กรอก Password
    [Arguments]    ${pwd}
    Input Password    ${ช่อง Password}    ${pwd}

กดปุ่ม login
    Click Button   ${ปุ่ม login}

จะพบข้อความ
      [Arguments]    ${output}
      Wait Until Page Contains    ${output}
      Capture Page Screenshot
