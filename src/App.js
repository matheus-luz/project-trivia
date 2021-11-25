import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './page/Game';
import Login from './page/Login';
import Game from './page/Game';
import Settings from './page/Settings';

export default function App() {
  return (
    <main className="App">
      <Switch>
        <Route path="/game" component={ Game } >
        <Route path="/settings" component={ Settings } />
        <Route path="/" component={ Login } />
      </Switch>
    </main>
  );
}
