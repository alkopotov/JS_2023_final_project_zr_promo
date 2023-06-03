const GRANDPIRX_PHOTOS = {
  '2021': 8,
  '2022': 8,
  '2023': 8
}

const STARRACE_PHOTOS = {
  '2013': 9,
  '2018': 9,
}

const RACE60_PHOTOS = {
  '2014': 10,
  '2017': 10,
}

const EVENTS_ZR = {
  'grandprix': [2021, 2022, 2023],
  'starrace': [2013, 2018],
  'race60': [2014, 2017]
}

const INITIAL_PHOTOS = [
  'images/initial1.webp',
  'images/initial2.jpg',
  'images/initial3.jpg',
  'images/initial4.webp',
  'images/initial5.webp',
  'images/race60/2014/img7.jpg'
]
const getNumber = function (a, b = 0) {
  return Math.floor(Math.random() * (a-b) + b);
}

const getPhotosLinks = function(eventZr, year){
  let linksPhotos = [];
  let numLinks = (eventZr == 'grandprix')? GRANDPIRX_PHOTOS[year] :
    (eventZr == 'race60') ? RACE60_PHOTOS[year] :
    STARRACE_PHOTOS[year];
  for (let i = 1; i<= numLinks; i++) {
    linksPhotos.push(`images/${eventZr}/${year}/img${i}.jpg`)
  }
  return linksPhotos;
}

// Выбор случайных неповторяющихся фото для галереи из переданного списка
const getPhotosForGallery = function(links, num){
  let numPhotos = (num > links.length) ? links.length :
    num;
  let galleryPhotos = [];
  galleryPhotos.push(links[getNumber(links.length)]);
  while (galleryPhotos.length < numPhotos) {
    let cur = links[getNumber(links.length)];
    if (!(galleryPhotos.includes(cur))) {
      galleryPhotos.push(cur);
    }
  }
  return galleryPhotos;
}

const createGalery  = function(parent, photos) {
  parent.style.display = 'grid';
  parent.style.gap = '7px';
  parent.style.gridTemplateColumns = `repeat(${photos.length}, 1fr)`
  parent.style.gridTemplateRows = `5fr 1fr`
  largePic = document.createElement('div')
  largePic.className = 'pic__large';
  largePic.style.gridColumnEnd = `span ${photos.length}`;
  largePic.style.backgroundImage = `url(${photos[0]})`
  largePic.style.backgroundSize = 'cover'
  parent.append(largePic)
  photos.forEach(el => {
    createCard(el, parent);
  })
  }
  const createCard = function (pictLink, parent){
    let card = document.createElement('div');
    card.className = 'pic__small';
    card.style.backgroundImage = `url(${pictLink})`;
    card.style.backgroundSize = 'cover';
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (){
      largePic.style.backgroundImage = `url(${pictLink})`
    })
    parent.appendChild(card);
  }
  const galleryPlaceholder = document.querySelector('.event__gallery');
  createGalery(galleryPlaceholder, INITIAL_PHOTOS, 6)

  const formEvent = document.forms[0];
  const eventName = formEvent.elements[0];
  const eventYear = formEvent.elements[1];
  eventName.value = '';
  eventYear.value = '';
  const eventTextArea = document.querySelector('.event__description')
  
  eventName.addEventListener('change', e => {
    eventYear.innerHTML = setYearOptions(e.target.value);
    eventYear.value = '';
    eventYear.classList.remove('elem_hidden');
    document.forms[0].children[2].classList.remove('elem_hidden');
  })

  eventYear.addEventListener('change', e => {
   if (e.target.value != '0') {
    galleryPlaceholder.innerHTML = '';
    createGalery(galleryPlaceholder, getPhotosForGallery(getPhotosLinks(eventName.value, e.target.value), getNumber(8,5)))
    }
    createTextContent(eventTextArea, textContentEvents[eventName.value][e.target.value])
  })
  
  function setYearOptions(eventZr){
    let res ='';
    let years = EVENTS_ZR[`${eventZr}`]
    years.forEach(elem => {
      res += `<option value="${elem}">${elem}</option>`;
    });
    return res;
  }

  const createTextContent = function(parent, textArray) {
    let textMarkup = `<h2 class="event__header">${textArray[0]}</h2>`;
    for (let i = 1; i < textArray.length; i++) {
      textMarkup += `<p class="event__text">${textArray[i]}</p>`
    }
    parent.innerHTML = textMarkup;
  }

  createTextContent(eventTextArea, textContentEvents['initial']);