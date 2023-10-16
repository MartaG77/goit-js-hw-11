import axios from 'axios';
const URL = 'https://pixabay.com/api/?key=';
export const fetchImages = async (questionValue, currentPage) => { try { const response = await axios.get(URL, {
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
  return response.data;
  } catch (error) {
    console.log('error:', error);
  }};
 
