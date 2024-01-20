/*
//1st function - getExchaneRate ->  To bi bilo meni getData
const getData =  async () => {
    const response = await axios.get('/src/data.json');
    // Extract values from object properties and form an array
    const dataArray = Object.values(response.data);
    //dataArray.map(jars => console.log(jars[1].avaliable))
    setUp(response.data);
        
}

const  setUp =  async (data) => {
  var dataJars = await data.jars;
  console.log(data.jars)
  var dataFilters = data.filters;
  for(const key in dataFilters) {
    let filterClass = dataFilters[key].value;
    let filterName = dataFilters[key].frontend_value;
    let newFilter = document.createElement('a');
    newFilter.classList.add('filter');
    newFilter.href = '#';
    newFilter.dataset.filter = filterClass;
    newFilter.innerHTML = filterName;
    //navMenu.appendChild(newFilter);
  }
  for (const key in dataJars) {
    let thumbnailContainer = document.createElement('div');
    let thumbnailImage = document.createElement('img');
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
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
      //addOverlay(thumbnailImage);
    } 
  }
  //fillCounter(dataJars.length);
  initial();


//     const numbers = [1, -1, 2, 3];
//      const items = numbers
//     .filter(n => n >= 0)
//     .map(n => ({ value: n }))
//     .filter(obj => obj.value > 1)
//     .map(obj => obj.value);

// console.log(items);

}
//2ns function - Get dataCountries
//3rd function - convertCurrency

//call converted curency to get meaningfull date

function initial() {
    const fullScreenContainer = document.querySelector('.full-screen-container');
    const thumbnailImages = document.querySelectorAll('.gallery__image');
    const thumbnailContainer = document.querySelectorAll('.thumbnail-gallery__container');
    const elem = document.querySelector('.main-carousel');
    var activeFilter = 'all';
    const counter = document.querySelector('.other-filters__count');
    console.log(thumbnailImages);
}
getData();*/


