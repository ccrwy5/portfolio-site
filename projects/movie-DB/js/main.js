$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getMovies(searchText);
      e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=a24a47e8')
  .then((response)=> {
      let movies = response.data.Search;
      let output = '';


      $.each(movies, (index, movie) => {
        console.log(movie);
          output += `
              <div class="col-md-3" style="padding-bottom: 30px;">
                  <div class="well text-center" style="background-color: #F5F5F5; height: auto; padding-bottom: 10px;">
                      <img src="${movie.Poster}" onerror="this.src='images/no-image-found.png'" alt="" class="img-thumbnail">
                      <h5 class="movie-title">${movie.Title} (${movie.Year})</h5>

                      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-outline-dark view-movie-btn" href="#">View More Info</a>
                  </div>
              </div>
          `;
      } );
      $('#movies').html(output)
  })
  .catch((err) => {
      console.log(err)
  })
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html'
  return false
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://www.omdbapi.com?i='+movieId+'&apikey=a24a47e8')
  .then((response) => {
      console.log(response);

      let movie = response.data
      let output =`
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
          </ul>
        </div>
      </div>
      <br><br><br>
      <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-dark">View IMDB</a>
          <a href="index.html" class="btn btn-outline-secondary">Go Back To Search</a>
        </div>
      </div>
    `;

      $('#movie').html(output);
  })
  .catch((err) => {
      console.log(err);
  });
}