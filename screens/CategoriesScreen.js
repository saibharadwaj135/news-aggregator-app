import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNews } from '../contexts/NewsContext';
import { useTheme } from '@react-navigation/native';

const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'];

const CategoriesScreen = () => {
  const { selectedCategory, selectCategory } = useNews();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            { backgroundColor: colors.card },
            selectedCategory === category && styles.selectedCategory
          ]}
          onPress={() => selectCategory(category)}
        >
          <Text style={[
            styles.categoryText,
            { color: colors.text },
            selectedCategory === category && styles.selectedCategoryText
          ]}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryButton: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50', // Green color
    borderColor: '#45a049', // Slightly darker green for border
  },
  categoryText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#ffffff', // White text for better contrast on green background
    fontWeight: 'bold',
  },
});

export default CategoriesScreen;

