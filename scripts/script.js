const fullScreenContainer = document.querySelector('.full-screen-container');
const thumbnailImages = document.querySelectorAll('.gallery__image');
const fullScreenGallery = document.querySelector('.flickity-slider');
const flickityVP = document.querySelector('flickity-viewport');
const thumbnailGallery = document.querySelector('.thumbnail-gallery');
const thumbnailContainer = document.querySelector('.thumbnail-gallery__container');
const elem = document.querySelector('.main-carousel');
const counter = document.querySelector('.other-filters__count');
var count = 0;

var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    adaptiveHeight: true,
    setGallerySize: false,
    imagesLoaded: true,
});


// Fill the gallery
function getImagesForGroup(groupIndex) {
    return [`./img/group${groupIndex}/img1.jpg`, `./img/group${groupIndex}/img2.jpg`, `./img/group${groupIndex}/img3.jpg`, `./img/group${groupIndex}/img4.jpg`];
}

thumbnailImages.forEach((image, index) => {
  image.dataset.group = index + 1;

  if(image.classList.contains('unavaliable')) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = 'NEDOSTUPNO';
    image.parentNode.appendChild(overlay);
  } else {
    count++;
  }

  counter.innerHTML = count;
}) 

//Opening flickity
thumbnailGallery.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('gallery__image') || e.target.classList.contains('overlay')) {
        var targetedElement = e.target;
        if (targetedElement.classList.contains('overlay')) {
          targetedElement = targetedElement.previousElementSibling;
          
        }
        const groupIndex = targetedElement.getAttribute('data-group');
        const imageGroup = document.querySelector('.image-group');
        if(e.target.classList.contains('overlay')) {
          imageGroup.classList.add('unavaliable');
        } else {
          imageGroup.classList.remove('unavaliable');
        }

        //Jar name display
        const groupImages = getImagesForGroup(groupIndex);
        imageGroup.innerHTML = `Tegla #${groupIndex}`;

        //fullScreenGallery.setAttribute('group', group);

        // Clear the full-screen gallery
        flkty.remove(flkty.getCellElements());

        // Populate the full-screen gallery with the images from the selected group
        groupImages.forEach((imageSrc) => {
            const carouselCell = document.createElement('div');
            const carouselImg = document.createElement('img');
            carouselCell.classList.add('carousel-cell');
            carouselImg.classList.add('carousel-cell-image');
            carouselImg.src = imageSrc;
            carouselImg.alt = 'Full-Screen Image';
            carouselCell.appendChild(carouselImg);
            flkty.append(carouselCell);
        });

        // Show the full-screen gallery
        fullScreenContainer.classList.add('show');
        // Do not delete!
        setInterval(() => {flkty.resize()}, 1);

        //disableing background scroll
        document.body.style.position = 'fixed';
    }
});

// Exit full screen gallery

const flickityNavigation = document.querySelectorAll('.flickity-button');
const carouselCell = document.querySelectorAll('.carousel-cell');

document.addEventListener('DOMContentLoaded', function () {

  fullScreenContainer.addEventListener('click', function (event) {
    // Check if the clicked element is one of the allowed elements
    const nonExit = ['carousel-cell-image', 'flickity-button', 'flickity-button-icon', 'flickity-button-icon', 'dot', 'image-group', 'flickity-page-dots', 'arrow']
    var shouldExit = true;
    let element = event.target;

    nonExit.forEach((el) => {
      if(element.classList.contains(el)) {
        shouldExit = false;
      }
    })

    if(shouldExit || element.classList.contains('exit')) {
      console.log('test');
      fullScreenContainer.classList.remove('show');
      document.body.style.position = '';
      console.log(element.classList)
    }
  })
})

fullScreenContainer.addEventListener('click', (event) => {
  
})

// Loader
function load() {
    var element = document.querySelector('.loader');
    fadeOut(element, 100);
}
load();


////////// filtrirat
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

var openElement = document.querySelector('.open-menu');
var closeElement = document.querySelector('.close-menu');
var menuLink = document.querySelectorAll('.nav-menu__link');

function openMenu() {
  var startMenu = document.querySelector('.start-menu');
  var mainNav = document.querySelector('.main-nav');

  startMenu.classList.remove('button-anim-close');
  mainNav.classList.remove('nav-anim');
  startMenu.classList.remove('button-anim');
  mainNav.classList.remove('nav-anim-close');

  startMenu.classList.add('button-anim');
  mainNav.classList.add('nav-anim');
}

function closeMenu() {
  var startMenu = document.querySelector('.start-menu');
  var mainNav = document.querySelector('.main-nav');

  startMenu.classList.remove('button-anim-close');
  mainNav.classList.remove('nav-anim');
  startMenu.classList.remove('button-anim');
  mainNav.classList.remove('nav-anim-close');

  startMenu.classList.add('button-anim-close');
  mainNav.classList.add('nav-anim-close');
}

openElement.onclick = openMenu;
closeElement.onclick = closeMenu;

menuLink.forEach(function(menuLink) {
  menuLink.onclick = closeMenu;
})

///Filtering gallery

function filterGallery(filter) {
  var images = document.querySelectorAll('.gallery__image');

  images.forEach(image => {
    let elClasses = image.dataset.type;
    
    if(elClasses.includes(filter) || filter === 'all') {
      image.parentNode.classList.remove('hidden');
    } else {
      image.parentNode.classList.add('hidden');
    }
  });
  closeMenu();
}

var filters = document.querySelectorAll('.filter');
filters.forEach(filter => {
  filter.addEventListener('click', (e) => {
    filters.forEach(e => {
      e.classList.remove('active');
    })
    filter.classList.add('active')
    var selectedFilter = filter.dataset.filter;
    setTimeout(filterGallery(selectedFilter), 2000);
  })

  //treba presložit
  if(!document.querySelector(`[data-type="${filter.dataset.filter}"]`) && filter.dataset.filter != 'all') {
    filter.classList.add('hidden');
  }
});


/*
//lazy load
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
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

//toggle
const showUnavaliable = document.querySelector('.show-unavaliable');

showUnavaliable.addEventListener('click', () => {
  if(showUnavaliable.checked) {
    thumbnailImages.forEach(image => {
      if(image.classList.contains('unavaliable') && !image.parentNode.classList.contains('hidden')) {
        image.parentNode.classList.add('hidden');
      }
    })
  } else {
    thumbnailImages.forEach(image => {
      if(image.classList.contains('unavaliable') && image.parentNode.classList.contains('hidden')) {
        console.log('test');
        image.parentNode.classList.remove('hidden');
      }
    })
  }
})
  