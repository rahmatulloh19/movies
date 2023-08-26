// brought element from DOM 
const elForm = document.querySelector(".form");
const elSearch = elForm.querySelector(".js-input__search");
const elYearFrom = elForm.querySelector(".js-input__from");
const elYearTo = elForm.querySelector(".js-input__to");
const elList = document.querySelector(".list");
const elBookmarkList = document.querySelector(".offcanvas-body");
const bookmarkBtn = document.querySelector(".bookmark-btn");

const bookmarkArr = JSON.parse(localStorage.getItem("markedMovie") || "[]");
localStorage.setItem("markedMovie", JSON.stringify(bookmarkArr));

const minMovies = movies.filter(item => item.movie_year >= 2015).slice(0, 20);

// making, rendering and appending function
function renderFilms(array, list, movieId) {
  // clearing inner the elList
  list.innerHTML = "";
  
  array.forEach(function(item) {
    if(list == elBookmarkList) {
      const liElement = document.createElement("li");
      liElement.classList.add("bookmark__item", "d-flex", "justify-content-between");
      liElement.textContent = item.Title;
      
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button"
      deleteBtn.classList.add("btn", "w-25", "offcanvas-btn");
      deleteBtn.dataset.id = item.ytid;
      
      liElement.appendChild(deleteBtn);
      elBookmarkList.appendChild(liElement);
    } else {
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
      
      const bookmarkBtn = document.createElement("button");
      bookmarkBtn.type = "button";
      bookmarkBtn.classList.add("bookmark-btn", "btn");
      bookmarkBtn.dataset.id = item.ytid;
      // changing image bookmark
      bookmarkBtn.addEventListener("click", () => {
        bookmarkBtn.classList.add("bookmark-img");
      })
      bookmarkArr.forEach(item => {
        if(item.ytid == bookmarkBtn.dataset.id) bookmarkBtn.classList.add("bookmark-img")
      })
      // if(bookmarkArr.forEach(item.ytid == bookmarkBtn.dataset.id))
      
      // we found which is the target asign bookmark and we removed the class form found bookmark
      elBookmarkList.addEventListener("click", evt => {
        if(evt.target.matches(".offcanvas-btn") && evt.target.dataset.id) {
          const nimadir = evt.target.dataset.id
          if(bookmarkBtn.dataset. id == nimadir) [
            bookmarkBtn.classList.remove("bookmark-img")
          ]
        }
      })
      
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
      
      cardImgElement.appendChild(bookmarkBtn);
      
      cardFrontElement.append(cardImgElement, cardInfoElement);
      
      cardBackElement.appendChild(cardInfoBackElement);
      
      cardElement.append(cardFrontElement, cardBackElement);
      
      cardContainerElement.appendChild(cardElement);
      
      liElement.appendChild(cardContainerElement);
      elList.appendChild(liElement);
    }
  })
}


function rotater() {
  const card = document.querySelector(".card");
  
  elList.addEventListener("click", evt => {
    if(!evt.target.matches(".bookmark-btn") && !evt.target.matches("a") && !evt.target.matches("svg") && !evt.target.matches(".link-text") && !evt.target.matches("path")) {
      card.classList.toggle("active");
    }
  })
}

renderFilms(minMovies, false);
rotater();

// search input codes
elSearch.addEventListener("keyup", function() {
  // get value search input and deleting aren't need spaces
  let elSearchValue = elSearch.value.trim().toLowerCase();
  
  // searching films' name finder function
  let filter = minMovies.filter(function(item) {
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
    let filterTo = minMovies.filter(function(item) {
      const condition = elYearToValue >= item.movie_year;
      return condition;
    })
    renderFilms(filterTo);
    rotater();
    
  } else if(elYearToValue == "") {
    let filterFrom = minMovies.filter(function(item) {
      const condition = elYearFromValue <= item.movie_year;
      return condition;
    })
    renderFilms(filterFrom);
    rotater();
  } else {
    let filterBetween = minMovies.filter(function(item) {
      const condition = elYearToValue >= item.movie_year && elYearFromValue <= item.movie_year;
      return condition;
    })
    renderFilms(filterBetween);
    rotater();
  }
})

elList.addEventListener("click", evt => {
  if(evt.target.matches(".bookmark-btn")) {
    const targetId = evt.target.dataset.id;
    const foundMovie = minMovies.find(item => item.ytid == targetId);
    
    if(!bookmarkArr.includes(foundMovie)) bookmarkArr.push(foundMovie);
    else alert("Movie is already added")
    localStorage.setItem("markedMovie", JSON.stringify(bookmarkArr));
    renderFilms(bookmarkArr, elBookmarkList)
  }
})

elBookmarkList.addEventListener("click", evt => {
  if(evt.target.matches(".offcanvas-btn")) {
    const targetId = evt.target.dataset.id;
    const foundMovieIndex = bookmarkArr.findIndex(item => item.ytid == targetId);
    
    bookmarkArr.splice(foundMovieIndex, 1);
    renderFilms(bookmarkArr, elBookmarkList, targetId);
    localStorage.setItem("markedMovie", JSON.stringify(bookmarkArr));
  }
})