"use strict"

var gImgs = [
    {
        id: 1,
        url: 'meme-imgs/1.jpg',
        keywords: []
    },
    {
        id: 2,
        url: 'meme-imgs/2.jpg',
        keywords: []
    },
    {
        id: 3,
        url: 'meme-imgs/3.jpg',
        keywords: []
    },
    {
        id: 4,
        url: 'meme-imgs/4.jpg',
        keywords: []
    },
    {
        id: 5,
        url: 'meme-imgs/5.jpg',
        keywords: []
    },
    {
        id: 6,
        url: 'meme-imgs/6.jpg',
        keywords: []
    },
    {
        id: 7,
        url: 'meme-imgs/7.jpg',
        keywords: []
    },
    {
        id: 8,
        url: 'meme-imgs/8.jpg',
        keywords: []
    },
    {
        id: 9,
        url: 'meme-imgs/9.jpg',
        keywords: []
    },
    {
        id: 10,
        url: 'meme-imgs/10.jpg',
        keywords: []
    },
    {
        id: 11,
        url: 'meme-imgs/11.jpg',
        keywords: []
    },
    {
        id: 12,
        url: 'meme-imgs/12.jpg',
        keywords: []
    },
    {
        id: 13,
        url: 'meme-imgs/13.jpg',
        keywords: []
    },
    {
        id: 14,
        url: 'meme-imgs/14.jpg',
        keywords: []
    },
    {
        id: 15,
        url: 'meme-imgs/15.jpg',
        keywords: []
    },
    {
        id: 16,
        url: 'meme-imgs/16.jpg',
        keywords: []
    },
    {
        id: 17,
        url: 'meme-imgs/17.jpg',
        keywords: []
    },
    {
        id: 18,
        url: 'meme-imgs/18.jpg',
        keywords: []
    }
]

function init(){
    renderGallery()
}

function renderGallery(){
    var strHTML = gImgs.map((img)=>{
        return `<div class="image" onclick="enterEditor(${img.id},'${img.url}')"><img src="${img.url}"></div>`
    }).join('')

    document.querySelector('.image-container').innerHTML = strHTML
}

function enterEditor(id,url){
    document.querySelector('.image-container').style.display = 'none'
    document.querySelector('.editor').style.display = 'flex'
    createMeme(id,url)
}