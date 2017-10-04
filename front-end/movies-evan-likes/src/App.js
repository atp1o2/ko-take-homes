import React, { Component } from 'react';
import { getMovies, getReviews } from './moviesApi';
import { sortObjectList } from './helpers';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      cached: false,
    }
  }

  componentDidMount () {
    getMovies((movies) => {
      getReviews((reviews) => {
        movies.map((movie) => {
          const reviewObj = reviews.filter(review => review["movie-id"] === movie["id"]);
          movie["review"] = reviewObj[0].review;
        })
        this.setState({
          movies: sortObjectList(movies, "title"),
          loading: false,
        })
      })
    })
  }

  render () {
    let moviesList = this.state.movies.map((movie) => {
      return <li key={movie.id}>{movie.title}</li>;
    })

    if (this.state.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='page'>
          <div className='app-description'>
            <h1 className='app-description__title'>Movies Evan Likes!</h1>
            <p className='app-description__content'>
              Below is a (not) comprehensive list of movies that Evan really
              likessss.
            </p>
          </div>

          <div className="app-main">
            <ul>
              {moviesList}
            </ul>
          </div>

        </div>
      )
    }
  }
}

export default App;
