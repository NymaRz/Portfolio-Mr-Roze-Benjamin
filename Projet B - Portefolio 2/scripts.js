const links = document.querySelectorAll('a[href^="#"]');
links.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    const href = this.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView({behavior: 'smooth'});
  });
});


function startAnimation() {
  const body = document.body;
  body.classList.add('animate-slide-in');
}
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.image-projet');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const close = document.querySelector('.close');
  let currentImageIndex = 0;
  let imagesArray = [];

  function updateLightboxImage() {
    lightboxImage.src = imagesArray[currentImageIndex];
  }

  images.forEach((image) => {
    image.addEventListener('click', function () {
      const imageSources = image.dataset.images.split(',');
      imagesArray = [image.src, ...imageSources];
      currentImageIndex = 0;
      updateLightboxImage();
      lightbox.style.display = 'block';
    });
  });

  prev.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    updateLightboxImage();
  });

  next.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    updateLightboxImage();
  });

  close.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });

  // Fermer la lightbox en cliquant en dehors de l'image
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
});
