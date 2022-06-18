"use strict"

function saveToLocalStorage(){
    deleteFromStorage(gMeme.memeId)


    var imgContent = gElCanvas.toDataURL('image/jpeg')
    gMeme.url = imgContent
    gMeme.selectedLineIdx = 0;
    
    if(!localStorage.savedMemes){
        localStorage.setItem('savedMemes',JSON.stringify([gMeme]))
    }else{
        localStorage.savedMemes = JSON.stringify([...JSON.parse(localStorage.savedMemes), gMeme])
    }
    console.log('Saved meme to local storage');
    console.log(JSON.parse(localStorage.savedMemes))

    savedMemes()
}

function loadFromLocalStorage(id){
    return loadAllFromLocalStorage().find((meme)=>{
        return meme.memeId === id
    })

}

function loadAllFromLocalStorage(){
    if(!localStorage.savedMemes) return [];
    return JSON.parse(localStorage.savedMemes)
}

function deleteFromStorage(id){
    var memes = loadAllFromLocalStorage()

    if(!memes.length) return;

    memes = memes.filter((meme)=>{
        return meme.memeId!==id
    })

    console.log(memes,'the memes');

    localStorage.savedMemes = JSON.stringify(memes)
}

function deleteFromSaved(event,id){
    stopProp(event)
    deleteFromStorage(id)
    renderSavedMemes()
}