"use strict"

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function generateMemeId(){
    var strPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890!$%^&*'
    var id = ''
    for(var i = 0; i < 12; i++){
        id+=strPool.charAt(getRndInteger(0,strPool.length))
    }
    return id
}