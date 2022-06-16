"use strict"

var gElCanvas = document.querySelector('.meme')

var gCtx = gElCanvas.getContext('2d')

var gElInput = document.querySelector('.input-text')

var gMeme;

var textSelection = true

function renderMeme(){
    
    var memeImg = new Image()
    memeImg.src = gMeme.template

    
    //when the image ready draw it on the canvas
    memeImg.onload = () => {
        gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText()
    };

}

function createMeme(id,url){
    gMeme = {
        selectedImgId: id,
        memeId: generateMemeId(),
        selectedLineIdx: 0,
        url: url,
        template: url,
        lines: [
            {
                txt: '',
                size: 30,
                align: 'center',
                color: 'white',
                stroke: true,
                pos: {x: gElCanvas.width/2,y: 35}
            },
            {
                txt: '',
                size: 30,
                align: 'center',
                color: 'white',
                stroke: true,
                pos: {x: gElCanvas.width/2,y: gElCanvas.height - 35}
            }
        ]
    }
    renderMeme()
}

function changeSelectedText(){
    var txt = gElInput.value
    gMeme.lines[gMeme.selectedLineIdx].txt = txt.trim()
    renderMeme()
}

function drawText(){
    for(var i = 0; i < gMeme.lines.length; i++){

        gCtx.setLineDash([]);
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = gMeme.lines[i].color
        gCtx.font = `${gMeme.lines[i].size}px Impact`
        gCtx.textAlign = gMeme.lines[i].align


        if(gMeme.lines[i].stroke){
            gCtx.lineWidth = 10
            gCtx.miterLimit=2;
            gCtx.strokeText(gMeme.lines[i].txt.toUpperCase(),gMeme.lines[i].pos.x,gMeme.lines[i].pos.y)
        }

        var lenghtOfText = gCtx.measureText(gMeme.lines[i].txt.toUpperCase()).width
        gCtx.fillText(gMeme.lines[i].txt.toUpperCase(),gMeme.lines[i].pos.x,gMeme.lines[i].pos.y)


        if(i===gMeme.selectedLineIdx && textSelection){
            drawSelection(gMeme.lines[i].pos.x,gMeme.lines[i].pos.y,lenghtOfText,gMeme.lines[i].size,gMeme.lines[i].align)
        }
    }
}

function switchLine(event){
    stopProp(event)
    if(gMeme.selectedLineIdx+2>gMeme.lines.length){
        gMeme.selectedLineIdx = 0
    }else{
        gMeme.selectedLineIdx++
    }

    gElInput.value = ''
    gElInput.placeholder = 'Text '+(gMeme.selectedLineIdx+1)
    gElInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
    toggleSelection(true)

}

function addTextLine(event){
    stopProp(event)
    gMeme.lines.push(
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'white',
            stroke: true,
            pos: {x: gElCanvas.width/2,y: gElCanvas.height/2}
        }
    )
    gMeme.selectedLineIdx = gMeme.lines.length-1
    gElInput.value = ''
    gElInput.placeholder = 'Text '+(gMeme.selectedLineIdx+1)
    toggleSelection(true)
}

function deleteTextLine(event){
    stopProp(event)
    if(gMeme.lines.length === 1) return;
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    switchLine(event)
    toggleSelection(true)
}


function updateAlignment(align,event){
    stopProp(event)
    gMeme.lines[gMeme.selectedLineIdx].align = align
    if(align === 'center'){
        gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width/2
    }else if(align === 'left'){
        gMeme.lines[gMeme.selectedLineIdx].pos.x = 5
    }else{
        gMeme.lines[gMeme.selectedLineIdx].pos.x = gElCanvas.width - 5
    }
    toggleSelection(true)
}

function updateTextSize(pxNum,event){
    stopProp(event)
    gMeme.lines[gMeme.selectedLineIdx].size+=pxNum
    gMeme.lines[gMeme.selectedLineIdx].pos.y+=pxNum

    toggleSelection(true)
}

function changeStroke(event){
    stopProp(event)
    gMeme.lines[gMeme.selectedLineIdx].stroke = !gMeme.lines[gMeme.selectedLineIdx].stroke
    toggleSelection(true)
}

function updateTextColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

function downloadMeme(elLink){
    toggleSelection(false)
   // setTimeout(()=>{
        var imgContent = gElCanvas.toDataURL('image/jpeg')// image/jpeg the default format
        elLink.href = imgContent 
    //},1000)
}

function drawSelection(x,y,length,height,align){
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.setLineDash([6]);
    if(align === 'left'){gCtx.strokeRect(x-5,y-height,length+10,height+10)}
    else if (align === 'center') gCtx.strokeRect(x-(length/2)-5,y-height,length+10,height+10)
    else gCtx.strokeRect(x-(length)-5,y-height,length+10,height+10)
}

// gElCanvas.addEventListener("mouseover",()=>{toggleSelection(true)})
// gElCanvas.addEventListener("mouseleave",()=>{toggleSelection(false)})

gElInput.addEventListener("focus",()=>{toggleSelection(true)})

function toggleSelection(state){
    textSelection = state
    renderMeme()
}

function stopProp(ev){
    ev.stopPropagation();
}