import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {fetchImages} from './pixabay-api';
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
loadMore.hidden = true;
let currentPage = 1;
let questionValue = '';
const showGallery = images => {
  images.map(image => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<div class='photo-card'><a class='photo-card--link' href='${image.largeImageURL}'><img src='${image.webformatURL}' alt='${image.tags}' loading='lazy'/></a><div class='info'><p class='info-item'><b>Likes</b>${image.likes}</p><p class='info-item'><b>Views</b>${image.views}</p><p class='info-item'><b>Comments</b>${image.comments}</p><p class='info-item'><b>Downloads</b>${image.downloads}</p></div></div>`
    );
  });
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};
form.addEventListener('submit', async event => {
  event.preventDefault();
  const inputText = event.currentTarget.elements.searchImages.value;
  if (inputText.trim() === '') {
    Notiflix.Report.failure('Error. You must enter something.');
    questionValue = '';
    return;
  }
  questionValue = inputText;
  gallery.innerHTML = '';
  currentPage = 1;
  await getImages(questionValue, currentPage);
  

  loadMore.addEventListener('click', async event => {
    event.preventDefault();
    currentPage++;
    await getImages(questionValue, currentPage);
    if (gallery.firstElementChild) {
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  });
  async function getImages(questionValue, currentPage) {  try {
    const data = await fetchImages(questionValue, currentPage);
    if (data.hits.length === 0) {Notiflix.Report.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
     } else {
      showGallery(data.hits);
      if (currentPage === 1) {
        Notiflix.Report.success(
          `Hooray! We found ${data.totalHits} images.`  
        );
      }
      if (data.totalHits <= currentPage * 40) {
        loadMore.disabled = true;
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        loadMore.disabled = false;
        loadMore.style.display = 'block';
      }
    }
  } catch (error) {
    
  }}

  });