const API_KEYS = '4XdUvFpquJ8x8uOv_jDs2J8SRhokUM4lzHN3ZO1VLYM'
const searchInpEl = document.getElementById('Search-input')
const searchBtnEl = document.getElementById('search-button')
const searchResultsEl = document.querySelector('.search-results')
const showMore = document.getElementById('show-more-button')

let imageFromWebsite = 0
let page = 1

async function searchImage(searchTerm) {
    let URL = `https://api.unsplash.com/search/photos/?page=${page}&query=${searchTerm}&client_id=${API_KEYS}`
    const resp = await fetch(URL)
    const data = await resp.json()
    return data
}


function getImage(){

    if (page===1){
        searchResultsEl.innerHTML=''
    }
    searchImage(searchInpEl.value).then(data => {
        imageFromWebsite = data.results
        console.log(imageFromWebsite);
        
        imageFromWebsite.map(element => {
            const imageWrapper = document.createElement('div')
            imageWrapper.classList.add('search-result')
            const image = document.createElement('img')
            image.src = element.urls.thumb
            image.alt = element.alt_desciption
            const imageLink = document.createElement('a')
            imageLink.href = element.links.html
            imageLink.target = '_blank'
            imageLink.textContent = element.alt_description

            imageWrapper.appendChild(image)
            imageWrapper.appendChild(imageLink)
            searchResultsEl.appendChild(imageWrapper)
        });

    })

    page++
    if(page>1){
        console.log(page);
        showMore.style.display = "block"
    }
}




searchBtnEl.addEventListener('click', getImage)
showMore.addEventListener('click', getImage)