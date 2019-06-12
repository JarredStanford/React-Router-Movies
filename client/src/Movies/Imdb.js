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
          movieList: new Array({
            title: result.Title,
            director: result.Director,
            id: result.imdbID,
            metascore: result.Metascore
          })
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
            <div key={movie.id} className="movie-card">
              <h2>{movie.title}</h2>
              <div className="movie-director">
                Director: <em>{movie.director}</em>
              </div>
              <div className="movie-metascore">
                Metascore: <strong>{movie.metascore}</strong>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Imdb;
