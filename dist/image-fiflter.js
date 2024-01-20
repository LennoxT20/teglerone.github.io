///Filtering gallery by type

function filterGallery(filter) {
  var images = document.querySelectorAll('.gallery__image');
  images.forEach(function (image) {
    var elClasses = image.dataset.type;
    if (elClasses.includes(filter) || filter === 'all') {
      image.parentNode.classList.remove('hidden');
    } else {
      image.parentNode.classList.add('hidden');
    }
  });
  closeMenu();
}
var filters = document.querySelectorAll('.filter');
filters.forEach(function (filter) {
  filter.addEventListener('click', function (e) {
    filters.forEach(function (e) {
      e.classList.remove('active');
    });
    filter.classList.add('active');
    var selectedFilter = filter.dataset.filter;
    setTimeout(filterGallery(selectedFilter), 2000);
  });
  //treba presložit
  if (!document.querySelector("[data-type=\"".concat(filter.dataset.filter, "\"]")) && filter.dataset.filter != 'all') {
    filter.classList.add('hidden');
  }
});

//Toggle filter by availabilty
var showUnavaliable = document.querySelector('.show-unavaliable');
showUnavaliable.addEventListener('click', function () {
  if (showUnavaliable.checked) {
    thumbnailImages.forEach(function (image, index) {
      if (image.classList.contains('unavaliable') && !image.parentNode.classList.contains('hidden')) {
        image.parentNode.classList.add('hidden');
        resetCounter(index);
      }
    });
  } else {
    thumbnailImages.forEach(function (image, index) {
      if (image.classList.contains('unavaliable')) {
        console.log('test');
        image.parentNode.classList.remove('hidden');
      }
      resetCounter(index);
    });
  }
});