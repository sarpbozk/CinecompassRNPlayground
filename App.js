import React, { useReducer } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const initialState = {
  movieName: '',
  movies: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIE_NAME':
      return { ...state, movieName: action.payload };
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const ExampleScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleButtonPress = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true }); // Start loading

      const encodedMovieName = encodeURIComponent(state.movieName);
      const apiKey = '87027965472f4df58ab7f4cfb6212185';
      const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodedMovieName}`;

      // simulated delay for better view of loading state 
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(searchURL);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_MOVIES', payload: data.results }); // Set movies
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false }); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to React Native!</Text>
      <View style={styles.content}>
        <Text>This is an example screen.</Text>
        <Text>You can add your content here.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a movie name"
          value={state.movieName}
          onChangeText={(text) => dispatch({ type: 'SET_MOVIE_NAME', payload: text })}
        />
        <Button title="Search" onPress={handleButtonPress} />
        {state.loading ? (
          <Text>Searching...</Text> // Display "Searching..." when loading is true
        ) : (
          <>
            <Text>Search Results:</Text>
            {state.movies.map((movie) => (
              <Text key={movie.id}>{movie.title}</Text>
            ))}
          </>
        )}
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
