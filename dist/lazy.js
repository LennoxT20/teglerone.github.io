var thumbnailImage = document.querySelectorAll('.gallery__image');
thumbnailImage.forEach(function (image, index) {
  console.log('test');
  image.dataset.group = index + 1;
  image.classList.add('lazy');
  if (image.classList.contains('unavaliable')) {
    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = 'NEDOSTUPNO';
    image.parentNode.appendChild(overlay);
  }
});
//lazy load
document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  if ("IntersectionObserver" in window) {
    var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
});