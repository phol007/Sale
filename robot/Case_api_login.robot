*** Settings ***
Library    Selenium2Library
Library    RequestsLibrary
Test Template    GETAPI

*** Variables ***

*** Test Cases ***
Get Requests    /login?usercode=tom&password=1234&appid=1

*** Keywords ***
GETAPI
    [Arguments]    ${PATH}
    Create Session    venus    http://venus:9000
    ${resp}=    Get Request    venus    ${PATH}
    Should Be Equal As Strings    ${resp.status_code}    200
    Should Not Be Empty    ${resp.json()}
