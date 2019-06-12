import React, { Component } from "react";
import { Route } from "react-router-dom";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import Imdb from "./Movies/Imdb";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      savedList: []
    };
  }

  addToSavedList = movie => {
    const savedList = this.state.savedList;
    const saveChecker = savedList
      .map(savedMovie => {
        return savedMovie.id;
      })
      .includes(movie.id);

    if (!saveChecker) {
      savedList.push(movie);
      //adds selected movie to the saved list if it isn't already there.
    } else
      savedList.splice(
        savedList.findIndex(savedMovie => savedMovie.id === movie.id),
        1
        //if it is already saved...this maps the array to find the index of the savedMovie that matches our selected movie. It then removes that spot on the saved list.
      );

    this.setState({ savedList });
  };

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route
          exact
          path="/movies/:id"
          render={props => (
            <Movie
              {...props}
              {...this.state}
              addToSavedList={this.addToSavedList}
            />
          )}
        />
        <Route exact path="/imdb" component={Imdb} />
      </div>
    );
  }
}
