// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryOfImg = document.querySelector('.gallery');

const imgGalery = galleryItems.map(image => {
  const newImg = `<li class="gallery__item">
   <a class="gallery__link" href="${image.original}">
      <img class="gallery__image" src="${image.preview}" alt="${image.description}" />
   </a>
</li>`;
  return newImg;
});

galleryOfImg.insertAdjacentHTML('afterbegin', imgGalery.join(''));

galleryOfImg.addEventListener('click', openOriginalImg);

function openOriginalImg(event) {
  event.preventDefault();

  if (event.target.tagName !== 'IMG') {
    return;
  }
}
createLightbox();

function createLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}
