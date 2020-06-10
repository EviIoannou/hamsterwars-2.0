import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom"
import './App.css';
import Battle from './components/Battle';

function App() {
  const hamsters= [
    {name:'Sixten', id: 1, pic:'hamster-1.jpg'},
    {name: 'Sven', id: 2, pic:'hamster-2.jpg'},
    {name: 'Ayla', id: 3, pic:'hamster-3.jpg'},
    {name:'Aleena', id: 4, pic:'hamster-4.jpg'},
    {name:'Tuss', id: 5, pic:'hamster-5.jpg'},
    {name: 'Zigge', id: 6, pic:'hamster-6.jpg'}
  ]
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
        <main>
            <Switch>
                <Route path='/battle'><Battle hamsters={hamsters}/></Route>
                <Route path='/matchup'></Route>
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
