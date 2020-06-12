import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom"
import './App.css';
import Battle from './components/Battle';
import AllMatches from './components/AllMatches';
import SpecificMatch from './components/SpecificMatch';

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
                <NavLink to="/statistics" activeClassName="active">Statistics</NavLink>
                <NavLink to="/upload" activeClassName="active">Uploads</NavLink>
            </nav>
        </header>
        <main className="App-main">
            <Switch>
                <Route path='/battle'><Battle/></Route>
                <Route path='/matchup/:matchId'><SpecificMatch /></Route>
                <Route path='/matchup'><AllMatches /></Route>
                
                <Route path='/statistics'></Route>
                <Route path='/upload'></Route>
                <Route path="/"></Route>
            </Switch>
        </main>
    </Router>
    </div>
  );
}


export default App;
