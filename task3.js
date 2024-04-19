document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('.section');

  function checkScroll() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('animate');
      }
    });
  }

  window.addEventListener('scroll', checkScroll);

  // Animated sections (optional - unchanged)

  // Favorite Watches Feature

  const likeButtons = document.querySelectorAll('.like-btn');

  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const watch = this.parentElement.parentElement;
      // Get the value of the background-image URL from the style attribute
      const backgroundImageUrl = watch.style.backgroundImage;
      // Extract the URL from the style attribute value
      const imageUrl = backgroundImageUrl.replace(/^url\(['"](.+)['"]\)$/, '$1');
      const watchDetails = {
        name: watch.querySelector('h3').textContent,
        price: watch.querySelector('p').textContent,
        image: imageUrl // Update image property
      };

      toggleFavorite(watch, watchDetails);
    });
  });

  function toggleFavorite(watch, watchDetails) {
    const favorites = getFavorites();
    const existingFavorite = favorites.find(fav => fav.name === watchDetails.name);

    if (existingFavorite) {
      // Watch already favorited, remove it
      favorites.splice(favorites.indexOf(existingFavorite), 1);
      watch.classList.remove('liked');
    } else {
      // New favorite, add it to the list
      favorites.push(watchDetails);
      watch.classList.add('liked');
    }

    storeFavorites(favorites);
    updateFavoritesList();
  }

  function getFavorites() {
    const favorites = localStorage.getItem('favoriteWatches');
    return favorites ? JSON.parse(favorites) : []; // Return empty array if no favorites
  }

  function storeFavorites(favorites) {
    localStorage.setItem('favoriteWatches', JSON.stringify(favorites));
  }

  function updateFavoritesList() {
    const favoritesContainer = document.querySelector('.favorites');
    favoritesContainer.innerHTML = " ";

    const favorites = getFavorites();

    favorites.forEach(watch => {
      const favoriteItem = document.createElement('div');
      favoriteItem.classList.add('favorite-item');
      favoriteItem.innerHTML = `
        <h3>${watch.name}</h3>
        <p>${watch.price}</p>
        <img src="${watch.image}" alt="${watch.name}" width="100px" height="200px">
        <button class="remove-btn">Remove</button>
      `;

      favoritesContainer.appendChild(favoriteItem);
    });
  }

  // Call updateFavoritesList on page load to display any existing favorites
  updateFavoritesList();

  // Functionality for remove button in favorite items (unchanged)
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const favoriteItem = this.parentElement; // Get the favorite item element
      const watchName = favoriteItem.querySelector('h3').textContent;

      const favorites = getFavorites();
      const watchIndex = favorites.findIndex(fav => fav.name === watchName);

      if (watchIndex > -1) {
        favorites.splice(watchIndex, 1);
        storeFavorites(favorites);
        updateFavoritesList();
      }
    });
  });
});
