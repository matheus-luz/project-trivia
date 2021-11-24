import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './page/Login';

export default function App() {
  return (
    <main className="App">
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </main>
  );
}
