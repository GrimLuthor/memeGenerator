"use strict"

var gElCanvas = document.querySelector('.meme')

var gCtx = gElCanvas.getContext('2d')

var gElInput = document.querySelector('.input-text')

var gMeme;

function renderMeme(){
    
    var memeImg = new Image()
    memeImg.src = gMeme.url

    
    //when the image ready draw it on the canvas
    memeImg.onload = () => {
        gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText()
    };

}

function createMeme(id,url){
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        url: url,
        lines: [
            {
                txt: '',
                size: 30,
                align: 'center',
                color: 'white',
                stroke: true,
                HeightAdjustment: 0
            },
            {
                txt: '',
                size: 30,
                align: 'center',
                color: 'white',
                stroke: true,
                HeightAdjustment: 0
            }
        ]
    }
    renderMeme()
}

function changeSelectedText(){
    var txt = gElInput.value
    gMeme.lines[gMeme.selectedLineIdx].txt = txt.toUpperCase()
    renderMeme()
}

function drawText(){
    for(var i = 0; i < gMeme.lines.length; i++){


        gCtx.fillStyle = gMeme.lines[i].color
        gCtx.font = `${gMeme.lines[i].size}px Impact`
        gCtx.textAlign = gMeme.lines[i].align



        var height;
        var width;


        if(i === 0){
            height = gMeme.lines[i].size+5
        }else if(i === 1){
            height = gElCanvas.width-gMeme.lines[i].size-5
        }else{
            height = gElCanvas.height/2
        }


        if(gMeme.lines[i].align === 'center'){
            width = gElCanvas.width/2
        }else if(gMeme.lines[i].align === 'left'){
            width = 5
        }else{
            width = gElCanvas.width - 5
        }

        if(gMeme.lines[i].stroke){
            gCtx.lineWidth = 10
            gCtx.miterLimit=2;
            gCtx.strokeText(gMeme.lines[i].txt,width,height+gMeme.lines[i].HeightAdjustment)
        }
        gCtx.fillText(gMeme.lines[i].txt,width,height+gMeme.lines[i].HeightAdjustment)
    }
}

function switchLine(){
    if(gMeme.selectedLineIdx+2>gMeme.lines.length){
        gMeme.selectedLineIdx = 0
        gElInput.value = ''
        gElInput.placeholder = 'Top Text'
    }else{
        gMeme.selectedLineIdx++
        gElInput.value = ''
        if(gMeme.selectedLineIdx === 1) gElInput.placeholder = 'Bottom Text'
        else gElInput.placeholder = 'Additional Text'
    }

}

function moveText(pxNum){
    gMeme.lines[gMeme.selectedLineIdx].HeightAdjustment +=pxNum
    renderMeme()
}

function addTextLine(){
    gMeme.lines.push(
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
            stroke: true,
            HeightAdjustment: 0
        }
    )
    gMeme.selectedLineIdx = gMeme.lines.length-1
    renderMeme()
}

function deleteTextLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    renderMeme()
}


function updateAlignment(align){
    gMeme.lines[gMeme.selectedLineIdx].align = align
    renderMeme()
}

function updateTextSize(pxNum){
    gMeme.lines[gMeme.selectedLineIdx].size+=pxNum
    renderMeme()
}

function changeStroke(){
    gMeme.lines[gMeme.selectedLineIdx].stroke = !gMeme.lines[gMeme.selectedLineIdx].stroke
    renderMeme()
}

function updateTextColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}