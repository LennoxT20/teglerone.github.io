
import all from '/src/script'

export default async function jsonData() {
    const response = await fetch('/src/data.json');
    const data = await response.json();
    console.log(data);
    
    
    async function getData() {
      var dataFilters = data.filters;
      var dataJars = await data.jars;
      let loaded = false;
      let promises = [];
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
        let thumbnailImage = document.createElement('img')
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
    }
    getData();    
}
