import React, { Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Card from './components/Card';
import Default from "./components/Default";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <ProductList />
        <Details />
        <Card />
        <Default />
      </Fragment>
    );
  }
}

export default App;
