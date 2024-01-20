var copyJson;
fetch('/src/data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  copyJson = data;
})["catch"](function (error) {
  return console.error('Error fetching JSON:', error);
});
console.log(copyJson);
var fullScreenContainer = document.querySelector('.full-screen-container');
var thumbnailImages = document.querySelectorAll('.gallery__image');
var thumbnailGallery = document.querySelector('.thumbnail-gallery');
var thumbnailContainer = document.querySelectorAll('.thumbnail-gallery__container');
var elem = document.querySelector('.main-carousel');
var activeFilter = 'all';
var counter = document.querySelector('.other-filters__count');
//console.log(data);

var flkty = new Flickity(elem, {
  cellAlign: 'center',
  contain: true,
  wrapAround: true,
  setGallerySize: false,
  imagesLoaded: true
});
function countImages() {
  var count = 0;
  thumbnailContainer.forEach(function (image, index) {
    if (!image.classList.contains('hidden')) count++;
  });
  counter.innerHTML = count;
}

// Fill the gallery
function getGroupImages(groupIndex) {
  return ["./img/jars/group".concat(groupIndex, "/img1.jpg"), "./img/jars/group".concat(groupIndex, "/img2.jpg"), "./img/jars/group".concat(groupIndex, "/img3.jpg"), "./img/jars/group".concat(groupIndex, "/img4.jpg")];
}

// Adding overlay on unavaliable
thumbnailImages.forEach(function (image, index) {
  image.dataset.group = index;
  if (image.classList.contains('unavaliable')) addOverlay(image);
  //image.classList.add('lazy')
});
countImages();
function addOverlay(element) {
  var overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.innerHTML = 'NEDOSTUPNO';
  element.parentNode.appendChild(overlay);
}

// Opening flickity
var imageGroup = document.querySelector('.image-group');
thumbnailGallery.addEventListener('click', function (e) {
  var clickedElement = e.target;
  if (clickedElement.classList.contains('gallery__image') || clickedElement.classList.contains('overlay')) {
    creatingFSGallery(clickedElement);
  }
});
function creatingFSGallery(clickedElement) {
  var clickedImage = clickedElement;
  // Clear the full-screen gallery
  flkty.remove(flkty.getCellElements());

  // Checking if image or overlay is clicked
  if (clickedElement.classList.contains('overlay')) {
    clickedImage = clickedElement.previousElementSibling;
  }

  // Add or remove class depending on the status
  var isUnavaliable = clickedElement.classList.contains('overlay');
  imageGroup.classList.toggle('unavaliable', isUnavaliable);

  // Update jar name display
  var groupIndex = clickedImage.getAttribute('data-group');
  imageGroup.innerHTML = "Tegla #".concat(groupIndex);

  // Populate the full-screen gallery with the images from the selected group
  var groupImages = getGroupImages(groupIndex);
  groupImages.forEach(function (imageSrc, index) {
    createCarousel(imageSrc, index);
    console.log(index);
  });

  // Show the full-screen gallery and disable background scroll
  fullScreenContainer.classList.add('show');
  document.body.style.position = 'fixed';

  // Do not delete!
  setInterval(function () {
    flkty.resize();
  }, 1);
}
function createCarousel(imageSrc, index) {
  var carouselCell = document.createElement('div');
  var carouselImg = document.createElement('img');
  carouselCell.classList.add('carousel-cell');
  carouselImg.classList.add('carousel-cell-image');
  carouselImg.src = imageSrc;
  carouselImg.alt = "Full-Screen Image ".concat(index);
  carouselCell.appendChild(carouselImg);
  flkty.append(carouselCell);
}

// Exit full screen gallery
var flickityNavigation = document.querySelectorAll('.flickity-button');
var carouselCell = document.querySelectorAll('.carousel-cell');
var nonExit = ['carousel-cell-image', 'flickity-button', 'flickity-button-icon', 'flickity-button-icon', 'dot', 'image-group', 'flickity-page-dots', 'arrow'];
document.addEventListener('DOMContentLoaded', function () {
  fullScreenContainer.addEventListener('click', function (e) {
    var element = e.target;
    if (shouldExitFullScreen(element)) exitFullScreen();
  });
});

// Check if the clicked element is one of the allowed nonExit elements
function shouldExitFullScreen(element) {
  // some =>  pogledati https://www.youtube.com/watch?v=7m9EiRS_Kc0
  return !nonExit.some(function (selectedClass) {
    return element.classList.contains(selectedClass);
  }) || element.classList.contains('exit');
}
function exitFullScreen() {
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
function openMenu() {
  startMenu.classList.remove('button-anim-close');
  mainNav.classList.remove('nav-anim');
  startMenu.classList.remove('button-anim');
  mainNav.classList.remove('nav-anim-close');
  startMenu.classList.add('button-anim');
  mainNav.classList.add('nav-anim');
}
function closeMenu() {
  startMenu.classList.remove('button-anim-close');
  mainNav.classList.remove('nav-anim');
  startMenu.classList.remove('button-anim');
  mainNav.classList.remove('nav-anim-close');
  mainNav.classList.add('nav-anim-close');
  startMenu.classList.add('button-anim-close');
}
openElement.onclick = openMenu;
closeElement.onclick = closeMenu;
menuLink.forEach(function (menuLink) {
  menuLink.onclick = closeMenu;
});

/// image-filter.js
/// Filtering gallery

function filterGallery(filter) {
  thumbnailImages.forEach(function (image) {
    var elClasses = image.dataset.type;
    var isHidden = !(elClasses.includes(filter) || filter === 'all');
    if (!showUnavaliable.checked && image.classList.contains('unavaliable')) {
      isHidden = true;
    }
    image.parentNode.classList.toggle('hidden', isHidden);
  });
  countImages();
  closeMenu();
}
var filters = document.querySelectorAll('.filter');
filters.forEach(function (filter) {
  var selectedFilter = filter.dataset.filter;
  var isHidden = !document.querySelector("[data-type*=\"".concat(selectedFilter, "\"]")) && selectedFilter != 'all';
  filter.classList.toggle('hidden', isHidden);
  filter.addEventListener('click', function (e) {
    activeFilter = e.target.dataset.filter;
    filters.forEach(function (e) {
      e.classList.remove('active');
    });
    filter.classList.add('active');
    setTimeout(filterGallery(selectedFilter), 2000);
  });
});

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
var showUnavaliable = document.querySelector('.show-unavaliable');
showUnavaliable.addEventListener('click', function () {
  if (!showUnavaliable.checked) {
    thumbnailImages.forEach(function (image) {
      if (image.classList.contains('unavaliable') && !image.parentNode.classList.contains('hidden')) {
        image.parentNode.classList.add('hidden');
      }
    });
  } else {
    thumbnailImages.forEach(function (image) {
      if (image.classList.contains('unavaliable') && (image.dataset.type.includes(activeFilter) || activeFilter === 'all')) {
        image.parentNode.classList.remove('hidden');
      }
    });
  }
  countImages();
});