import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useNews } from '../contexts/NewsContext';

const SettingsScreen = () => {
  const { darkMode, toggleDarkMode } = useNews();

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.setting}>
        <Text style={[styles.settingText, darkMode && styles.darkText]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default SettingsScreen;

