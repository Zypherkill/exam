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

async function randomTrailers() {
    let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();
    console.log(movies);
    
    
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * movies.length);
        let movie = movies[randomIndex];
        
        renderTrailers(movie, i+1);
    }

    favoriteMovies(movies);
}

randomTrailers();

async function favoriteMovies() {
    let response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();
    const container = document.querySelector('.card-container');

    //Sorterar filmerna efter titel
    movies.sort((a, b) => a.Title.localeCompare(b.Title));

    movies.forEach(movie => {
        //Skapar upp själva korten
        const card = document.createElement('section');
        card.className = 'card';

        //Skapar stjärnknappen
        const button = document.createElement('button');
        const icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');

        //Lägger in posters i korten
        const img = document.createElement('img');
        img.classList.add ('poster');
        img.src = movie.Poster;

        //Titel på varje kort
        const title = document.createElement('h3');
        title.classList.add ('cardTitle');
        title.textContent = movie.Title;

        //Appendar alla nya skapade element
        card.appendChild(button);
        button.appendChild(icon);
        card.appendChild(img);
        card.appendChild(title);
        container.appendChild(card);
    });
}