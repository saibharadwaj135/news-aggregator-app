import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNews } from '../contexts/NewsContext';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ArticleCard = ({ article }) => {
  const { darkMode, saveBookmark, removeBookmark, isBookmarked } = useNews();
  const { colors } = useTheme();
  const bookmarked = isBookmarked(article.url);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(article.url);
    } else {
      saveBookmark(article);
    }
  };

  const openArticle = async () => {
    const canOpen = await Linking.canOpenURL(article.url);
    if (canOpen) {
      await Linking.openURL(article.url);
    } else {
      console.error('Cannot open URL:', article.url);
    }
  };

  return (
    <TouchableOpacity onPress={openArticle}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={[styles.description, { color: colors.text }]} numberOfLines={3}>
            {article.description}
          </Text>
          <View style={styles.footer}>
            <Text style={[styles.source, { color: colors.text }]}>
              {article.source.name}
            </Text>
            <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={bookmarked ? '#4CAF50' : colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
  },
  bookmarkButton: {
    padding: 5,
  },
});

export default ArticleCard;

