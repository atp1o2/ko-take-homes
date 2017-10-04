import React, { Component } from 'react';
import { getMovies, getReviews } from './moviesApi';
import { sortObjectList, decadeBuilder } from './helpers';
import Accordion from './Accordion';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      movies: [],
      years: [],
      searchTitle: '',
      searchDecade: '',
      loading: true,
    }
  }

  componentDidMount () {
    const cachedStorage = localStorage.getItem("movies");
    if (cachedStorage) {
      console.log("localStorage movie cache found.")
      let cachedMovies = JSON.parse(cachedStorage);
      this.setState({
        movies: cachedMovies,
        years: this.findYears(cachedMovies),
        loading: false,
      })
    } else {
      console.log("Load Movies with Reviews API request ran.")
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
          years: this.findYears(movies),
          loading: false,
        })
      })
    })
  }

  findYears (movies) {
    let years = [];
    movies.map((movie) => {
      years.push(movie.year);
    })
    return years.sort();
  }

  updateSearch (e) {
    this.setState({
      searchTitle: e.target.value.toLowerCase(),
    })
  }

  updateDecade (e) {
    this.setState({
      searchDecade: e.target.value,
    })
  }

  render () {
    let filteredMovies = this.state.movies.filter((movie) => {
      let floor, ceiling;
      if (this.state.searchDecade) {
        floor = this.state.searchDecade;
        ceiling = this.state.searchDecade.slice(0, -1) + 9;
      } else {
        floor = this.state.years[0];
        ceiling = this.state.years[this.state.years.length - 1];
      }

      return movie.title.toLowerCase().indexOf(this.state.searchTitle) !== -1
        && movie.year >= floor
        && movie.year <= ceiling
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
            </p>
          </div>

          <div className="app-main">
            <form>
              <input
                type="text"
                value={this.state.searchTitle}
                onChange={this.updateSearch.bind(this)}
                placeholder="Search by Title" />

              <select onChange={this.updateDecade.bind(this)}>
                <option defaultValue value={''}>-</option>
                {
                  decadeBuilder(this.state.years).map((decade) => {
                    return (<option value={decade} key={decade}>{decade}</option>);
                  })
                }
              </select>
            </form>

            <ul>
              {
                filteredMovies.map((movie) => {
                  const header = (
                    <div>{movie.score * 100}% <a href={movie.url}>{movie.title}</a> ({movie.year})</div>
                  )
                  const body = (
                    <div>
                      <img className="cover-img" src={movie["cover-url"]} alt="Movie Cover Art" />
                      <p>{movie.review}</p>
                    </div>
                  )
                  return (
                    <Accordion header={header} body={body} key={movie.id} />
                  );
                })
              }
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default App;
