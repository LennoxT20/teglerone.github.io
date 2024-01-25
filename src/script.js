
//1st function - getExchaneRate ->  To bi bilo meni getData
const navMenu = document.querySelector('.nav-menu');
const thumbnailGallery = document.querySelector('.thumbnail-gallery');
const fullScreenContainer = document.querySelector('.full-screen-container');
var thumbnailContainer, thumbnailImages;
var filters = [];
var jsonData, dataJars, dataFilters;

const getData =  async () => {
  try {
    const response = await (axios.get('/src/data.json'));
    jsonData = response.data;
    dataJars = await jsonData.jars;
    dataFilters = jsonData.filters;

    // Extract values from object properties and form an array
    const dataArray = Object.values(response.data);
    //dataArray.map(jars => console.log(jars[1].avaliable))
    setUp(jsonData);
  } catch(error) {
    throw new Error (`Unable to get data from JSON at ${error.stack  }`);
  }
}

function setUp() {
  for(const key in dataFilters) {
    let filterClass = dataFilters[key].value;
    let filterName = dataFilters[key].frontend_value;
    let newFilter = document.createElement('a');
    newFilter.classList.add('filter');
    newFilter.href = '#';
    newFilter.dataset.filter = filterClass;
    newFilter.innerHTML = filterName;
    navMenu.appendChild(newFilter);
  }
  for (const key in dataJars) {
    let thumbnailContainer = document.createElement('div');
    let thumbnailImage = document.createElement('img');
    thumbnailContainer.classList.add('thumbnail-gallery__container');
    thumbnailImage.classList.add('gallery__image');
    thumbnailImage.classList.add('lazy');
    thumbnailImage.alt = 'thumbnail'
    thumbnailImage.dataset.group = key;
    thumbnailImage.src = `./img/jars/group${key}/img1.jpg`;
    thumbnailContainer.appendChild(thumbnailImage);
    thumbnailGallery.appendChild(thumbnailContainer);

    if(dataJars[key].avaliable == false) {
      thumbnailContainer.classList.add('unavaliable');
      addOverlay(thumbnailImage);
    } 
  }
  fillCounter(dataJars.length);
  initial();
}

function initial() {
  const fullScreenContainer = document.querySelector('.full-screen-container');
  const elem = document.querySelector('.main-carousel');
  var activeFilter = 'all';
  const counter = document.querySelector('.other-filters__count');
  filters = document.querySelectorAll('.filter');
  thumbnailImages = document.querySelectorAll('.gallery__image');
  thumbnailContainer = document.querySelectorAll('.thumbnail-gallery__container');
  manageFilters();
}
getData();

const elem = document.querySelector('.main-carousel');
var activeFilter = 'all';
const counter = document.querySelector('.other-filters__count');


var flkty = new Flickity(elem, {
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
    setGallerySize: false,
    imagesLoaded: true,
});

function countImages() {
  let count = 0
  thumbnailContainer.forEach((image) => {
    if(!image.classList.contains('hidden')) count ++;
  })
  fillCounter(count);
}

function fillCounter(number) {
  counter.innerHTML = number;
}

// Fill the gallery
function addOverlay (element) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = 'NEDOSTUPNO';
  element.parentNode.appendChild(overlay);
}

// Opening flickity
const imageGroup = document.querySelector('.image-group');
thumbnailGallery.addEventListener('click', (e) => {
  var clickedElement = e.target;

  if (clickedElement.classList.contains('gallery__image') || clickedElement.classList.contains('overlay')) {  
    creatingFSGallery(clickedElement);
  }
});

function creatingFSGallery (clickedElement) {
  let clickedImage = clickedElement;
  // Clear the full-screen gallery
  flkty.remove(flkty.getCellElements());
  
  // Checking if image or overlay is clicked
  if (clickedElement.classList.contains('overlay')) {
    clickedImage = clickedElement.previousElementSibling;
  }

  // Add or remove class depending on the status
  const isUnavaliable = clickedElement.classList.contains('overlay');
  imageGroup.classList.toggle('unavaliable', isUnavaliable);

  // Update jar name display
  const groupIndex = clickedImage.getAttribute('data-group');
  imageGroup.innerHTML = `Tegla #${groupIndex}`;

  // Populate the full-screen gallery with the images from the selected group
  for(let i = 1; i <= dataJars[groupIndex].img_number; i++) {
    createCarousel(groupIndex, i);
  }

  // Show the full-screen gallery and disable background scroll
  fullScreenContainer.classList.add('show');
  document.body.style.position = 'fixed';

  // Do not delete!
  setInterval(() => {flkty.resize()}, 1);
}

function createCarousel (groupIndex, imageIndex) {
  const pathToImg = `./img/jars/group${groupIndex}/img${imageIndex}.jpg`;
  const carouselCell = document.createElement('div');
  const carouselImg = document.createElement('img');
  carouselCell.classList.add('carousel-cell');
  carouselImg.classList.add('carousel-cell-image');
  carouselImg.src = pathToImg;
  carouselImg.alt = `Full-Screen Image ${imageIndex}`;
  carouselCell.appendChild(carouselImg);
  flkty.append(carouselCell);
}
// Exit full screen gallery
const flickityNavigation = document.querySelectorAll('.flickity-button');
const carouselCell = document.querySelectorAll('.carousel-cell');
const nonExit = ['carousel-cell-image', 'flickity-button', 'flickity-button-icon', 'flickity-button-icon', 'dot', 'image-group', 'flickity-page-dots', 'arrow']
document.addEventListener('DOMContentLoaded', function () {
  fullScreenContainer.addEventListener('click', function (e) {
    const element = e.target;
    if(shouldExitFullScreen(element)) exitFullScreen();
  })
})

// Check if the clicked element is one of the allowed nonExit elements
function shouldExitFullScreen (element) {
  // some =>  pogledati https://www.youtube.com/watch?v=7m9EiRS_Kc0
  return (!nonExit.some(selectedClass => element.classList.contains(selectedClass)) || element.classList.contains('exit'));
}

function exitFullScreen () {
  fullScreenContainer.classList.remove('show');
  document.body.style.position = '';
}

// Loader
function load() {
    var element = document.querySelector('.loader');
    fadeOut(element, 100);
}
load();

// Side menu Animation
function fadeOut(element, duration) {
    var milliseconds = 10; // Adjust this for smoother/faster animation
    var steps = duration / milliseconds;
    var opacity = 1;
  
    function step() {
      opacity -= 1 / steps;
      element.style.opacity = opacity;
      
      if (opacity <= 0) {
        element.style.display = 'none'; // Optionally hide the element when faded out
      } else {
        requestAnimationFrame(step);
      }
    }
  
    requestAnimationFrame(step);
}


// Controlling side menu navigation
var openElement = document.querySelector('.open-menu');
var closeElement = document.querySelector('.close-menu');
var menuLink = document.querySelectorAll('.nav-menu__link');
var startMenu = document.querySelector('.start-menu');
var mainNav = document.querySelector('.main-nav');
console.log(mainNav)

function openMenu() {
  startMenu.classList.remove('button-anim-close');
  mainNav.classList.remove('nav-anim');
  startMenu.classList.remove('button-anim');
  mainNav.classList.remove('nav-anim-close');

  startMenu.classList.add('button-anim');
  mainNav.classList.add('nav-anim');
}

function closeMenu() {
  if(document.body.clientWidth <= 768) {
    mainNav.classList.add('closed');
  } else {
    mainNav.classList.add('nav-anim-close');
    startMenu.classList.add('button-anim-close');
  }
}

openElement.onclick = openMenu;
closeElement.onclick = closeMenu;

menuLink.forEach(function(menuLink) {
  menuLink.onclick = closeMenu;
})

//mobile menu

var openElementMobile = document.querySelector('.open-mobile');
var closeElementMobile = document.querySelector('.close-menu');
openElementMobile.onclick = openMobile;

function openMobile() {
  mainNav.classList.remove('closed');
}

/// image-filter.js
/// Filtering gallery

function filterGallery(filter) {
  thumbnailImages.forEach((image, index) => {
    let jarType = dataJars[index].type;
    let isHidden = !(jarType.includes(filter) || filter === 'all');
    if(!showUnavaliable.checked && dataJars[index].avaliable === false) { 
      isHidden = true;
    }
    image.parentNode.classList.toggle('hidden', isHidden);
  });
  countImages();
  closeMenu();
}

function manageFilters () {
  filters.forEach(filter => {
    var selectedFilter = filter.dataset.filter;
    var isHidden = true;
    //check if filter should be used
    dataJars.forEach(jar => {
      if(jar.type.includes(selectedFilter) || selectedFilter === 'all') {
        isHidden = false;
      }
    })

    filter.classList.toggle('hidden', isHidden);
    
    filter.addEventListener('click', (e) => {
      activeFilter = e.target.dataset.filter;
      filters.forEach(e => {
        e.classList.remove('active');
      })
      filter.classList.add('active');
      filterGallery(selectedFilter)
      //setTimeout(filterGallery(selectedFilter), 2000);
    })
  });
}


/*
//lazy load
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll(".gallery__image"));
  
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to event handlers here
    }
  });*/
///image-filter.js


// Toggle
const showUnavaliable = document.querySelector('.show-unavaliable');
showUnavaliable.addEventListener('click', () => {
  if(!showUnavaliable.checked) {
    thumbnailImages.forEach((image, index) => {
      if(!dataJars[index].avaliable && !image.parentNode.classList.contains('hidden')) {
        image.parentNode.classList.add('hidden');
      }
    })
  } else {
    thumbnailImages.forEach((image, index) => {
      if((dataJars[index].type.includes(activeFilter) || activeFilter === 'all')) {
        image.parentNode.classList.remove('hidden');
      } 
    })
  }
  countImages();
})
  