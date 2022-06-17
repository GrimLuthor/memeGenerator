"use strict"

var gImgs = [
    {
        id: 1,
        url: 'meme-imgs/1.jpg',
        keywords: ['weird','trump']
    },
    {
        id: 2,
        url: 'meme-imgs/2.jpg',
        keywords: ['animal','cute','dog']
    },
    {
        id: 3,
        url: 'meme-imgs/3.jpg',
        keywords: ['animal','cute','baby']
    },
    {
        id: 4,
        url: 'meme-imgs/4.jpg',
        keywords: ['animal','cat','tired']
    },
    {
        id: 5,
        url: 'meme-imgs/5.jpg',
        keywords: ['baby','cute']
    },
    {
        id: 6,
        url: 'meme-imgs/6.jpg',
        keywords: ['weird']
    },
    {
        id: 7,
        url: 'meme-imgs/7.jpg',
        keywords: ['baby','cute']
    },
    {
        id: 8,
        url: 'meme-imgs/8.jpg',
        keywords: ['weird','amused']
    },
    {
        id: 9,
        url: 'meme-imgs/9.jpg',
        keywords: ['cute','evil','baby','laughing']
    },
    {
        id: 10,
        url: 'meme-imgs/10.jpg',
        keywords: ['obama','laughing']
    },
    {
        id: 11,
        url: 'meme-imgs/11.jpg',
        keywords: ['weird','bro']
    },
    {
        id: 12,
        url: 'meme-imgs/12.jpg',
        keywords: ['you','explaining']
    },
    {
        id: 13,
        url: 'meme-imgs/13.jpg',
        keywords: ['leonardo', 'dicaprio','toast','celebrating']
    },
    {
        id: 14,
        url: 'meme-imgs/14.jpg',
        keywords: ['matrix','sunglasses']
    },
    {
        id: 15,
        url: 'meme-imgs/15.jpg',
        keywords: ['mordor','boromir','lotr','explaining']
    },
    {
        id: 16,
        url: 'meme-imgs/16.jpg',
        keywords: ['hilarious','amused']
    },
    {
        id: 17,
        url: 'meme-imgs/17.jpg',
        keywords: ['putin','two','explaining']
    },
    {
        id: 18,
        url: 'meme-imgs/18.jpg',
        keywords: ['toy','story','explaining']
    }
]

function init(){
    renderGallery()
}

function renderGallery(){
    var imgs = JSON.parse(JSON.stringify(gImgs))
    imgs = filter(imgs)
    var strHTML = imgs.map((img)=>{
        return `<div class="image" onclick="enterEditor(${img.id},'${img.url}')"><img src="${img.url}"></div>`
    }).join('')

    document.querySelector('.image-container').innerHTML = strHTML
}

function enterEditor(id,url){
    document.querySelector('.filter').classList.add('hidden')
    document.querySelector('.dropdown').classList.add('hidden')
    document.querySelector('.image-container').style.display = 'none'
    document.querySelector('.editor').style.display = 'flex'
    createMeme(id,url)
    defaultTools()
}

function editSavedMeme(id){
    document.querySelector('.filter-saved-input').classList.add('hidden')
    document.querySelector('.dropdown').classList.add('hidden')
    document.querySelector('.image-container').style.display = 'none'
    document.querySelector('.editor').style.display = 'flex'
    gMeme = loadFromLocalStorage(id)
    defaultTools()
    renderMeme()
}

function savedMemes(){
    document.querySelector('.filter').classList.add('hidden')

    document.querySelector('.filter-saved-input').classList.remove('hidden')

    document.querySelector('.dropdown').classList.add('hidden')
    document.querySelector('.image-container').style.display = 'flex'
    document.querySelector('.to-saved').style.borderBottom = '1px solid black'
    document.querySelector('.to-gallery').style.borderBottom = '0'
    document.querySelector('.editor').style.display = 'none'

    renderSavedMemes()
}

function renderSavedMemes(){
    var savedMemes = loadAllFromLocalStorage()

    var savedMemes = filterSaved(savedMemes)

    var strHTML = savedMemes.map((meme)=>{
        return `<div class="image" onclick="editSavedMeme('${meme.memeId}')">
        <button class="btn optdelete" onclick="deleteFromSaved(event,'${meme.memeId}')">
        <img src="ICONS/trash.png">
        </button>
        <img src="${meme.url}"></div>`
    }).join('')

    document.querySelector('.image-container').innerHTML = strHTML
}

function toGallery(){
    document.querySelector('.filter').classList.remove('hidden')
    document.querySelector('.filter-saved-input').classList.add('hidden')
    document.querySelector('.dropdown').classList.add('hidden')
    document.querySelector('.image-container').style.display = 'flex'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.to-saved').style.borderBottom = '0'
    document.querySelector('.to-gallery').style.borderBottom = '1px solid black'
    renderGallery()
}

function shareAndDownload(){
    document.querySelector('.download').classList.toggle('hidden')
    document.querySelector('.save').classList.toggle('hidden')
    document.querySelector('.facebook').classList.toggle('hidden')
}

function closeShare(){
    document.querySelector('.download').classList.add('hidden')
    document.querySelector('.save').classList.add('hidden')
    document.querySelector('.facebook').classList.add('hidden')
}

function defaultTools(){
    closeShare()
    gElInput.value = gMeme.lines[0].txt
    gElInput.placeholder = 'Text 1'
    document.querySelector('.font').value = 'Impact'
    document.querySelector('.colorpicker').value = '#FFFFFF'
}