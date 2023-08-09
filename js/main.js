// brought element from DOM 
const elForm = document.querySelector(".form");
const elSearch = elForm.querySelector(".js-input__search");
const elYearFrom = elForm.querySelector(".js-input__from");
const elYearTo = elForm.querySelector(".js-input__to");
const elList = document.querySelector(".list");


// making, rendering and appending function
function renderFilms(array) {
  // clearing inner the elList
  elList.innerHTML = "";
  
  array.forEach(function(item) {
    // making and giving class to maked elements
    const liElement = document.createElement("li");
    liElement.classList.add("item");
    
    const cardContainerElement = document.createElement("div");
    cardContainerElement.classList.add("cardContainer", "inactive");
    
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    
    const cardFrontElement = document.createElement("div");
    cardFrontElement.classList.add("side", "front");
    
    const cardBackElement = document.createElement("div");
    cardBackElement.classList.add("side", "back");
    
    const cardImgElement = document.createElement("div");
    cardImgElement.classList.add("img");
    cardImgElement.style.backgroundImage = `url(http://i3.ytimg.com/vi/${item.ytid}/hqdefault.jpg)`;
    
    const cardInfoElement = document.createElement("div");
    cardInfoElement.classList.add("info");
    const cardInfoText = item.Categories.split("|").join(", ");
    cardInfoElement.innerHTML = `<h3 class="item-title">${item.Title}</h3>
    <p class="item-desc">${cardInfoText}</p>`
    
    const cardInfoBackElement = document.createElement("div");
    cardInfoBackElement.classList.add("info");
    cardInfoBackElement.innerHTML = `<h3 class="item-title">${item.fulltitle}</h3>
    <div class="info-inner">
    <div class="reviews">
    <svg fill="#ff0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    <p>${item.imdb_rating} Grade</p>
    </div>
    <p class="item-desc">
    ${item.summary}
    </p>
    <span>Duration ${item.runtime} min</span>
    <span>Language ${item.language}</span></div>
    <a class="link btn" href="https://www.imdb.com/title/${item.imdb_id}/" target="_blank">
    <span class="link-text">Learn more</span>
    <svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>
    </a>`
    
    liElement.appendChild(cardContainerElement);
    
    cardContainerElement.appendChild(cardElement);
    
    cardElement.append(cardFrontElement, cardBackElement);
    
    cardFrontElement.append(cardImgElement, cardInfoElement);
    
    cardBackElement.appendChild(cardInfoBackElement);
    
    elList.appendChild(liElement);
  })
}

function rotater() {
  
  const cards = document.getElementsByClassName("card");

  Array.from(cards).forEach(item => item.addEventListener("click", transition))
  function transition() {
    if (this.classList.contains("active")) {
      this.classList.remove("active")
    } else {
      this.classList.add("active");
    }
  } 
}

renderFilms(movies.slice(0, 100));
rotater();

// search input codes
elSearch.addEventListener("keyup", function() {
  // get value search input and deleting aren't need spaces
  let elSearchValue = elSearch.value.trim().toLowerCase();
  
  // searching films' name finder function
  let filter = movies.filter(function(item) {
    let lower_name = item.fulltitle.toLowerCase();
    return lower_name.includes(elSearchValue);
  })
  
  renderFilms(filter)
  rotater();
})

// years input codes
elForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  const elYearFromValue = elYearFrom.value;
  const elYearToValue = elYearTo.value;
  
  // finding films between from elYearFromValue to elYearToValue
  if(elYearFromValue == "") {
    let filterTo = movies.filter(function(item) {
      const condition = elYearToValue >= item.movie_year;
      return condition;
    })
    renderFilms(filterTo);
    rotater();
  } else if(elYearToValue == "") {
    let filterFrom = movies.filter(function(item) {
      const condition = elYearFromValue <= item.movie_year;
      return condition;
    })
    renderFilms(filterFrom);
    rotater();
  } else {
    let filterBetween = movies.filter(function(item) {
      const condition = elYearToValue >= item.movie_year && elYearFromValue <= item.movie_year;
      return condition;
    })
    renderFilms(filterBetween);
    rotater();
  }
})

