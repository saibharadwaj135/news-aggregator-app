import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useNews } from '../contexts/NewsContext';
import ArticleCard from '../components/ArticleCard';

const SearchScreen = () => {
  const { articles, darkMode } = useNews();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <TextInput
        style={[styles.searchInput, darkMode && styles.darkSearchInput]}
        placeholder="Search articles..."
        placeholderTextColor={darkMode ? '#888' : '#666'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredArticles}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={item => `${item.url}-${item.title}-${item.publishedAt || Date.now()}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  darkSearchInput: {
    borderColor: '#444',
    color: '#fff',
    backgroundColor: '#333',
  },
});

export default SearchScreen;

