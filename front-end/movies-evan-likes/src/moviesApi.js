const getJson = (url) => (callback) => {
  fetch(url).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        callback(data);
      })
    } else {
      throw new Error('Network response was not ok');
    }
  }).catch((error) => {
    console.log('Fetch Catch ', error);
  })
}

export const getMovies = getJson('/movies');
export const getReviews = getJson('/reviews');
