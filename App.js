import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const ExampleScreen = () => {
  const [movieName, setMovieName] = React.useState('');
  const [movies, setMovies] = React.useState([]);

  const handleButtonPress = async () => {
    try {
      const encodedMovieName = encodeURIComponent(movieName);
      const apiKey = '87027965472f4df58ab7f4cfb6212185';
      const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodedMovieName}`;
      
      const response = await fetch(searchURL);
      const data = await response.json();

      if (response.ok) {
        const parsedMovies = parseMovieData(data);
        setMovies(parsedMovies);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const parseMovieData = (data) => {
    if (data && data.results) {
      return data.results;
    }
    return [];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Movies</Text>
      <View style={styles.content}>
        <Text>This is a dummy app to test imdb search functionality</Text>
        <Text>You can search for moviesby pressing "search" button</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a movie name"
          value={movieName}
          onChangeText={setMovieName}
        />
        <Button title="Search" onPress={handleButtonPress} />
        <Text>Search Results:</Text>
        {movies.map((movie) => (
          <Text key={movie.id}>{movie.title}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
});

export default ExampleScreen;
