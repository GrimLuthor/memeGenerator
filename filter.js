"use strict"

var gFilterBy = ''

var gFilterSavedBy = ''

function filter(imgs){
    gFilterBy = document.querySelector('.filter-input').value.toLowerCase()

    if(gFilterBy===''){
        return imgs
    }

    return imgs.filter((img)=>{
        return img.keywords.find((tag) => {
            if(tag.includes(gFilterBy)){
                return true
            }
        })
    })
}


function filterSaved(memes){
    gFilterSavedBy = document.querySelector('.filter-saved-input').value.toLowerCase()

    if(gFilterSavedBy===''){
        return memes
    }

    return memes.filter((meme)=>{
        if (gImgs[meme.selectedImgId-1].keywords.find((tag) => {
            if(tag.includes(gFilterSavedBy)){
                return true
            }
        })) {

            return true
        }

        if(meme.lines.find((line)=>{
            if(line.txt.toLowerCase().includes(gFilterSavedBy)){
            
                return true
            }
        })){
            return true
        }
    })
}

