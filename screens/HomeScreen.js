import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNews } from '../contexts/NewsContext';
import ArticleCard from '../components/ArticleCard';
import { useTheme } from '@react-navigation/native';

const HomeScreen = () => {
  const { articles, selectedCategory } = useNews();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.categoryTitle, { color: colors.text }]}>
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News
      </Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => <ArticleCard article={item} />}
        keyExtractor={item => `${item.url}-${item.publishedAt}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;

