import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';
import {showGallery, currentPage, loadMore, questionValue} from '.';
const URL = 'https://pixabay.com/api/?key=';
const fetchImages = async () => {
  try {
    const response = await axios.get(URL, {
      params: {
        key: '40040363-d145279656575dd2a7df2e0d0',
        q: questionValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });
    if (response.data.hits.length === 0) {
      Notiflix.Report.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      ); loadMore.disabled = true;
        } else {
      showGallery(response.data.hits);
      if (currentPage === 1) {
        Notiflix.Report.success(
          `Hooray! We found ${response.data.totalHits} images.`
        );
      }
      if (response.data.totalHits <= currentPage * 40) {
        loadMore.disabled = true;
        Notiflix.Report.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        loadMore.disabled = false;
        loadMore.style.display = 'block';
      }
    }
  } catch (error) {
  }
};
export {fetchImages};