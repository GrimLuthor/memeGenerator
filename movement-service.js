"use strict"

var gStartPos;
var gSelectedText;
var gIsDrag = false
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

addMouseListeners()
addTouchListeners()

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {

    closeShare()
   
    //Get the ev pos from mouse or touch
    const clickPos = getEvPos(ev)

    var selectedText = false;

   
    

    for(var i = 0; i < gMeme.lines.length; i++){
        if(isTextClicked(clickPos,i)){
            selectedText = true
            gSelectedText = gMeme.lines[i]
            gIsDrag = true
            gMeme.selectedLineIdx = i


            gElInput.value = ''
            gElInput.placeholder = 'Text '+(gMeme.selectedLineIdx+1)
            gElInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
            toggleSelection(true)

            
            break;
        }
    }

    if(!selectedText) return;

    //Save the pos we start from 
    
    gStartPos = clickPos
    document.body.style.cursor = 'grabbing'

}

function isTextClicked(pos,i){
    var rightHeight = false
    var rightWidth = false;


    gCtx.font = `${gMeme.lines[i].size}px ${gMeme.lines[i].font}`
    var length = gCtx.measureText(gMeme.lines[i].txt).width


    //width check
    if(gMeme.lines[i].align === 'left'){
        if(pos.x > gMeme.lines[i].pos.x && pos.x < gMeme.lines[i].pos.x+length){
            rightWidth = true;

        }
    }else if(gMeme.lines[i].align === 'center'){
        if(pos.x > gMeme.lines[i].pos.x-(length/2) && pos.x < gMeme.lines[i].pos.x+(length/2)){
            rightWidth = true;

        }
    }else{
        if(pos.x > gMeme.lines[i].pos.x - length && pos.x < gMeme.lines[i].pos.x){
            rightWidth = true;

        }
    }

    //height check

    if(pos.y > gMeme.lines[i].pos.y-gMeme.lines[i].size && pos.y < gMeme.lines[i].pos.y){
        rightHeight = true
    }

    return rightHeight&&rightWidth

}


function getEvPos(ev) {

    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    
    // Check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
    
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Calc coefficient of img width and screen width
        var memeSize = gElCanvas.width
        var actualSize = document.querySelector(".meme").offsetWidth

        var multiplicator = memeSize/actualSize

        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: (ev.pageX - ev.target.offsetLeft - ev.target.clientLeft)*multiplicator,
            y: (ev.pageY - ev.target.offsetTop - ev.target.clientTop)*multiplicator
        }
    }

    return pos
}

function onMove(ev) {
    if (gIsDrag) {
        const pos = getEvPos(ev)
        //Calc the delta , the diff we moved
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        dragText(dx, dy)
        //Save the last pos , we remember where we`ve been and move accordingly
        gStartPos = pos
        //The canvas is render again after every move
        renderMeme()
    }
}

function dragText(dx,dy){
    gSelectedText.pos.x += dx
    gSelectedText.pos.y += dy
}

function onUp() {
    gIsDrag = false
    document.body.style.cursor = 'auto'
}

