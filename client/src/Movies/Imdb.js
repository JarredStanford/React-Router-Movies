import React from "react";
//imports a random movie or TV show from IMDB api...
class Imdb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: []
    };
  }
  componentDidMount = () => {
    fetch(
      "https://www.omdbapi.com/?apikey=8894cd6c&plot=full&i=tt0" +
        `${Math.floor(Math.random() * (999999 - 100000) + 100000)}`
    )
      .then(res => res.json())
      .then(result => {
        this.setState({
          movieList: new Array(result)
        });
      });
  };

  render() {
    if (!this.state.movieList) {
      return <div>Loading movie information...</div>;
    }
    console.log(this.state.movieList);
    return (
      <div>
        {this.state.movieList.map(movie => {
          return (
            <div key={movie.imdbID} className="movie-card">
              <h2>{movie.Title}</h2>
              <div className="movie-director">
                Director: <em>{movie.Director}</em>
              </div>
              <div className="movie-metascore">
                Metascore: <strong>{movie.Metascore}</strong>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Imdb;
