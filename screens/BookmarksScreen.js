import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNews } from '../contexts/NewsContext';
import ArticleCard from '../components/ArticleCard';
import { useTheme } from '@react-navigation/native';

const BookmarksScreen = () => {
  const { bookmarks } = useNews();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Bookmarked Articles</Text>
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          renderItem={({ item }) => <ArticleCard article={item} />}
          keyExtractor={item => item.url}
        />
      ) : (
        <Text style={[styles.emptyText, { color: colors.text }]}>No bookmarked articles yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookmarksScreen;

