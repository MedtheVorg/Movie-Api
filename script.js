const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aa07de664872e86c9c74f8488eb3d84e&page=1";
const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=aa07de664872e86c9c74f8488eb3d84e&query="';
const moviesContainer = document.querySelector(".movies-container");
const searchInput = document.querySelector(".searchInput");
const searchForm = document.querySelector("#form");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    moviesContainer.innerHTML = "";
    getMovies(`${SEARCH_URL}${searchInput.value}"`);
});

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results, "length", data.results.length);
    if (data.results.length > 0) {
        updateMovies(data);
    } else {
        const dataNotFound = document.createElement("div");
        dataNotFound.setAttribute("class", "datanotfound");
        dataNotFound.innerText = ` No results were found :( 
            try Searching for another term`;
        moviesContainer.appendChild(dataNotFound);
    }
}

function updateMovies(moviesData) {
    moviesData.results.forEach((row) => {
        const movie = document.createElement("div");
        movie.setAttribute("class", "movie");

        const overview = document.createElement("div");
        overview.setAttribute("class", "overview");

        const paragraphe = document.createElement("p");
        paragraphe.innerText = "Overview";
        overview.appendChild(paragraphe);
        overview.append(row.overview);

        const movieImage = document.createElement("img");
        if (row.backdrop_path) {
            movieImage.setAttribute("src", `${IMAGE_URL}${row.backdrop_path}`);
        } else if (row.poster_path) {
            movieImage.setAttribute("src", `${IMAGE_URL}${row.poster_path}`);
        } else {
            movieImage.setAttribute("src", "img/image404.bmp");
        }
        movieImage.setAttribute("class", "movie-img");

        const movieContent = document.createElement("div");
        movieContent.setAttribute("class", "movie-content");
        const movieTitle = document.createElement("p");
        movieTitle.setAttribute("class", "movie-title");
        movieTitle.innerText = row.original_title;
        const movieRating = document.createElement("span");
        movieRating.innerText = row.vote_average;
        if (+row.vote_average < 5) {
            movieRating.setAttribute("class", "movie-rating red");
        } else if (+row.vote_average < 7) {
            movieRating.setAttribute("class", "movie-rating orange");
        } else if (+row.vote_average >= 7) {
            movieRating.setAttribute("class", "movie-rating green");
        }
        movieContent.appendChild(movieTitle);
        movieContent.appendChild(movieRating);
        movie.appendChild(overview);
        movie.appendChild(movieImage);
        movie.appendChild(movieContent);
        moviesContainer.appendChild(movie);
    });
}
