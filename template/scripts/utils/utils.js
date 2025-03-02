export function swapIcon(icon, filmId) {
    const favorites = JSON.parse(localStorage.getItem('favoritfilmer')) || [];
    if (favorites.includes(filmId)) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }
}

export function handleFavorites(filmId) {
    let favorites = JSON.parse(localStorage.getItem('favoritfilmer')) || [];
    
    if (favorites.includes(filmId)) {
        // Ta bort filmen från favoriter
        favorites = favorites.filter(id => id !== filmId);
    } else {
        // Lägg till filmen i favoriter
        favorites.push(filmId);
    }
    
    localStorage.setItem('favoritfilmer', JSON.stringify(favorites));
}