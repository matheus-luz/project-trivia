import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './page/Login';
import Game from './page/Game';

export default function App() {
  return (
    <main className="App">
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    </main>
  );
}
