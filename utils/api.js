import axios from 'axios';

const API_KEY = '3f888b331cde472eb8f98314d4d76366';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';


export const fetchNews = async (category = 'general') => {
  try {
    const response = await axios.get(`${BASE_URL}?country=us&category=${category}&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};