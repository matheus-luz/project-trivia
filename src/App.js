import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './page/Game';
import Login from './page/Login';
import Settings from './page/Settings';
import Feedback from './page/Feedback';
import Ranking from './page/Ranking';

export default function App() {
  return (
    <main className="App">
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/settings" component={ Settings } />
        <Route path="/" component={ Login } />
      </Switch>
    </main>
  );
}
