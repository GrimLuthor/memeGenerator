"use strict"

var gFilterBy = ''

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