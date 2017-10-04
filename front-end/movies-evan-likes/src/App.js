import React, { Component } from 'react';
import { getMovies, getReviews } from './moviesApi';
import { sortObjectList } from './helpers';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      movies: [],
      searchTitle: '',
      loading: true,
      cached: false,
    }
  }

  componentDidMount () {
    const cachedStorage = localStorage.getItem("movies");
    if (cachedStorage) {
      this.setState({
        movies: JSON.parse(cachedStorage),
        loading: false,
      })
    } else {
      this.loadMoviesWithReviews();
    }
  }

  loadMoviesWithReviews () {
    getMovies((movies) => {
      getReviews((reviews) => {
        movies.map((movie) => {
          const reviewObj = reviews.filter(review => review["movie-id"] === movie["id"]);
          movie["review"] = reviewObj[0].review;
        })
        localStorage.setItem("movies", JSON.stringify(movies));
        this.setState({
          movies: sortObjectList(movies, "title"),
          loading: false,
        })
      })
    })
  }

  updateSearch (e) {
    const value = e.target.value.toLowerCase();
    this.setState({
      searchTitle: value,
    })

  }


  render () {
    let filteredMovies = this.state.movies.filter((movie) => {
        return movie.title.toLowerCase().indexOf(this.state.searchTitle) !== -1;
    })

    let moviesList = filteredMovies.map((movie) => {
      return (
        <li key={movie.id}>
          {movie.score * 100}% <a href={movie.url}>{movie.title}</a> ({movie.year})
        </li>
      );
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
              likes.
              <br>
              TODO:
              - Search filter validates 2 characters before filtering
            </p>
          </div>

          <div className="app-main">
            <form>
              <input
                type="text"
                value={this.state.searchTitle}
                onChange={this.updateSearch.bind(this)}
                placeholder="Search by Title"
                />
            </form>

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
