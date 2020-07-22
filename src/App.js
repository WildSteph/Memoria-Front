import React from 'react';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
} from 'react-router-dom';
import CharactersListe from './Component/CharactersListe';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route component={CharactersListe} exact path="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
