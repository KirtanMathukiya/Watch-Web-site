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
  
  // Get references to DOM elements
  const watchCarousel = document.getElementById("watch-carousel");
  const virtualTryOnContainer = document.getElementById("virtual-try-on-container");

  // Add event listener to the "Try On" button
  document.getElementById("try-on-button").addEventListener("click", function() {
    // Get the currently active carousel item
    const activeItem = watchCarousel.querySelector(".carousel-item.active img");
    
    // Set the src attribute of the virtual try-on image to the selected watch image
    virtualTryOnContainer.querySelector("img").src = activeItem.src;
  });

  // JavaScript for image slider with fade animations
  const images = document.querySelectorAll('.card.image-card img');
  let index = 0;

  function showImage() {
    images.forEach(image => image.classList.remove('active'));
    images[index].classList.add('active');
    index = (index + 1) % images.length;
  }

  setInterval(showImage, 3000); // Change image every 3 seconds
});
