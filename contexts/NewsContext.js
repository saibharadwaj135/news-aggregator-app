import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchNews } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadArticles();
    loadDarkModePreference();
    loadBookmarks();
  }, [selectedCategory]);

  const loadArticles = async () => {
    const newArticles = await fetchNews(selectedCategory);
    setArticles(newArticles);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  const loadDarkModePreference = async () => {
    try {
      const value = await AsyncStorage.getItem('@dark_mode');
      if (value !== null) {
        setDarkMode(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    try {
      await AsyncStorage.setItem('@dark_mode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const loadBookmarks = async () => {
    try {
      const value = await AsyncStorage.getItem('@bookmarks');
      if (value !== null) {
        setBookmarks(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const saveBookmark = async (article) => {
    try {
      const updatedBookmarks = [...bookmarks, article];
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem('@bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const removeBookmark = async (articleUrl) => {
    try {
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.url !== articleUrl);
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem('@bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const isBookmarked = (articleUrl) => {
    return bookmarks.some(bookmark => bookmark.url === articleUrl);
  };

  return (
    <NewsContext.Provider value={{
      articles,
      selectedCategory,
      darkMode,
      bookmarks,
      selectCategory,
      toggleDarkMode,
      loadArticles,
      saveBookmark,
      removeBookmark,
      isBookmarked,
    }}>
      {children}
    </NewsContext.Provider>
  );
};

