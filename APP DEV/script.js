// script.js

let currentSlide = 0; // Current slide index
const slides = document.querySelectorAll('.carousel-slide'); // Get all slides
const totalSlides = slides.length; // Total number of slides
const slideInterval = 3000; // Interval time in milliseconds (3 seconds)

// Function to show a specific slide
function showSlide(index) {
  if (index >= totalSlides) {
    currentSlide = 0; // Loop back to first slide
  } else if (index < 0) {
    currentSlide = totalSlides - 1; // Loop to last slide
  } else {
    currentSlide = index;
  }
  const offset = -currentSlide * 100; // Calculate offset for the slide
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.style.transform = `translateX(${offset}%)`; // Move the slides
}

// Function to move to the next slide
function moveSlide() {
  showSlide(currentSlide + 1); // Move to the next slide
}

// Initialize the carousel
showSlide(currentSlide);

// Set an interval to automatically move the slides
setInterval(moveSlide, slideInterval);
