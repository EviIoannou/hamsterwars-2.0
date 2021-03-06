import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom"
import './App.css';
import AllMatches from './components/AllMatches';
import SpecificMatch from './components/SpecificMatch';
import UploadHamster from './components/UploadHamster';
import BattleWithParams from './components/BattleWithParams';
import BattleRandom from './components/BattleRandom';
import Stats from './components/Stats';
import Start from './components/Start';
// import Stats from './components/Stats';

function App() {
  

  return (
    <div className="App">
      <Router>
        <header className="App-header">
            <h1>Hamsterwars</h1>
            <nav>
                <NavLink exact to="/" activeClassName="active">Start</NavLink>
                <NavLink to="/battle" activeClassName="active">Battle</NavLink>
                <NavLink to="/matchup" activeClassName="active">Results</NavLink>
                <NavLink to="/stats" activeClassName="active">Statistics</NavLink>
                <NavLink to="/upload" activeClassName="active">Uploads</NavLink>
            </nav>
        </header>
        <main className="App-main">
            <Switch>
                <Route path='/battle/:id1/:id2'><BattleWithParams /></Route>
                <Route path='/battle'> <BattleRandom /></Route>
                <Route path='/matchup/:matchId'><SpecificMatch /></Route>
                <Route path='/matchup'><AllMatches /></Route>
                
                <Route path='/stats'><Stats /></Route>
                <Route path='/upload'><UploadHamster /></Route>
                <Route path="/"> <Start /></Route>
            </Switch>
        </main>
    </Router>
    </div>
  );
}


export default App;
