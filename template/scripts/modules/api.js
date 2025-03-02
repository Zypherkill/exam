import { renderTrailers } from "./caroussel.js";
import {createMovieCard} from "../components/movieCard.js"
import { swapIcon,handleFavorites } from "../utils/utils.js";

export function searchMovie() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att sidan laddas om

        const searchInput = document.getElementById('searchInput').value; // Hämta värdet från sökfältet
        window.location.href = `search.html?query=${encodeURIComponent(searchInput)}`;
    });

    window.addEventListener('DOMContentLoaded', () => {
        const url = new URLSearchParams(window.location.search);
        const searchQuery = url.get('query');
    
        if (searchQuery) {
            const container = document.querySelector('.card-container');
            
            fetch(`http://www.omdbapi.com/?apikey=861cd857&s=${searchQuery}*`)
                .then(response => response.json())
                .then(data => {
                    const movies = data.Search;
                    container.innerHTML = ''; // Rensa gammalt innehåll
                    movies.forEach(movie => {
                        createMovieCard(movie, container);
                    });
                })
                .catch(error => console.error('Fel vid hämtning av API:', error));
        }
    });

}

export async function randomTrailers() {
    if (window.location.pathname === '/template/index.html') {
        let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        let movies = await response.json();
    
        for (let i = 0; i < 5; i++) {
            let randomIndex = Math.floor(Math.random() * movies.length);
            let movie = movies[randomIndex];
            
            renderTrailers(movie, i+1);
        }
    
        recommendedMovies(movies);
    }
}

async function recommendedMovies() {
    if (window.location.pathname === '/template/index.html') {
        let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        let movies = await response.json();
        const container = document.querySelector('.card-container');
    
        movies.sort((a, b) => a.Title.localeCompare(b.Title));
    
        movies.forEach(movie => {
            createMovieCard(movie, container);
        });
    }
}

export function fetchAndDisplayMovie() {
    const urlParams = new URLSearchParams(window.location.search);
    const filmId = urlParams.get('filmId');

    if (window.location.pathname === '/template/movie.html') {
        fetch(`http://www.omdbapi.com/?apikey=861cd857&plot=full&i=${filmId}`)
            .then(response => response.json())
            .then(movie => {
                document.querySelector('.movie-title').textContent = movie.Title;
                document.querySelector('.movie-poster').src = movie.Poster;
                document.querySelector('.movie-rating').textContent = `Rated: ${movie.Rated}`;
                document.querySelector('.movie-genre').textContent = `Genre: ${movie.Genre}`;
                document.querySelector('.movie-runtime').textContent = `Runtime: ${movie.Runtime}`;
                document.querySelector('.releaseDate').textContent = `Released: ${movie.Released}`;
                document.querySelector('.imdb-rating').textContent = `Rating: ${movie.imdbRating}`;
                document.querySelector('.movie-description').textContent = movie.Plot;
                document.querySelector('.movie-director').textContent = movie.Director;
                document.querySelector('.movie-writer').textContent = movie.Writer;
                document.querySelector('.movie-actors').textContent = movie.Actors;
            })
            .catch(error => console.error('Något gick fel:', error));
    
            const starIcon = document.querySelector('i');
            swapIcon(starIcon, filmId);
    
    
        starIcon.addEventListener('click', function() {
            starIcon.classList.toggle('fa-solid');
            starIcon.classList.toggle('fa-regular');
            handleFavorites(filmId);
        });
    }
};

export function favoriteMovies () {
    if (window.location.pathname === '/template/favorites.html') {
        const favoriter = JSON.parse(localStorage.getItem('favoritfilmer')) || [];
        const container = document.querySelector('.card-container'); // Se till att du har en container på sidan
        favoriter.forEach(filmId => {
            fetch(`http://www.omdbapi.com/?apikey=861cd857&i=${filmId}`)
            .then(response => response.json())
            .then(movie => {
                createMovieCard(movie, container);
            })
            .catch(error => console.error('Något gick fel:', error));
        });
    }

}