import { renderTrailers } from "./modules/caroussel.js";
if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');

}

searchMovie();

function searchMovie() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att sidan laddas om

        const searchInput = document.getElementById('searchInput').value; // Hämta värdet från sökfältet
        window.location.href = `search.html?query=${encodeURIComponent(searchInput)}`;
    });

    addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('query');
    
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



async function randomTrailers() {
    let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();
    console.log(movies);

    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * movies.length);
        let movie = movies[randomIndex];
        
        renderTrailers(movie, i+1);
    }

    recommendedMovies(movies);
}

randomTrailers();

function createMovieCard(movie, container) {
    const card = document.createElement('section');
    card.className = 'card';

    const button = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-star');

    icon.addEventListener('click', function() {
        icon.classList.toggle('fa-solid');
        icon.classList.toggle('fa-regular');
    });

    const img = document.createElement('img');
    img.classList.add('poster');
    img.src = (movie.Poster && movie.Poster !== "N/A") ? movie.Poster : 'res/icons/missing-poster.svg';

    const textBox = document.createElement('section');
    textBox.classList.add('textBox');

    const title = document.createElement('h3');
    title.classList.add('cardTitle');
    title.textContent = movie.Title;


    card.appendChild(button);
    button.appendChild(icon);
    card.appendChild(img);
    card.appendChild(textBox);
    textBox.appendChild(title);
    container.appendChild(card);
}

async function recommendedMovies() {
    let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();
    const container = document.querySelector('.card-container');

    movies.sort((a, b) => a.Title.localeCompare(b.Title));

    movies.forEach(movie => {
        createMovieCard(movie, container);
    });
}