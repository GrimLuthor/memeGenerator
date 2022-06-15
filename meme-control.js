"use strict"

var gElCanvas = document.querySelector('.meme')

var gCtx = gElCanvas.getContext('2d')

var gMeme;

function renderMeme(id){
    var meme = gImgs.find((img)=>{
        return img.id === id
    })
    
    createMeme(id)

    document.querySelector('.input-text').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt

    var memeImg = new Image()
    memeImg.src = meme.url

    
    //when the image ready draw it on the canvas
    memeImg.onload = () => {
        gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height);
    };


}

function createMeme(id){
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Top Text',
                size: 20,
                align: 'center',
                color: 'white'
            }
        ]
    }
}

function changeSelectedText(){
    var txt = document.querySelector('.input-text').value
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
