import { swapIcon, handleFavorites } from "../utils/utils.js";

export function createMovieCard(movie, container) {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-movie-id', movie.imdbID);

    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-star');

    swapIcon(icon, movie.imdbID);

    const favoriter = JSON.parse(localStorage.getItem('favoritfilmer')) || [];
    if (favoriter.includes(movie.imdbID)) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    }

    icon.addEventListener('click', function(event) {
        icon.classList.toggle('fa-solid');
        icon.classList.toggle('fa-regular');
        const movieCard = event.target.closest('.card');
        const filmId = movieCard.getAttribute('data-movie-id');


        handleFavorites(filmId);

        if (window.location.pathname === '/template/favorites.html'){
            movieCard.remove();
        }

    });

    const img = document.createElement('img');
    img.classList.add('poster');
    img.src = (movie.Poster && movie.Poster !== "N/A") ? movie.Poster : 'res/icons/missing-poster.svg';

    const textBox = document.createElement('section');
    textBox.classList.add('textBox');

    const title = document.createElement('h3');
    title.classList.add('cardTitle');
    title.textContent = movie.Title;
    
    card.appendChild(icon);
    card.appendChild(img);
    card.appendChild(textBox);
    textBox.appendChild(title);
    container.appendChild(card);

    getMovieInfo();
}

function getMovieInfo() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Kontrollera om klicket kommer från en ikon
            if (!event.target.closest('i')) {
                const filmId = card.getAttribute('data-movie-id');
                window.location.href = `movie.html?filmId=${filmId}`;
            }
        });
    });
};