import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom"
import './App.css';
import Battle from './components/Battle';

function App() {
  const [hamsters, setHamsters] = useState(null); 
  
   useEffect(() =>{
    let baseUrl = '/api';
    async function getHamsters() {
    try{
        const response = await fetch(baseUrl + '/hamsters')
        const hamsterObject = await response.json();
        console.log(hamsterObject.hamsters)
        await setHamsters(hamsterObject.hamsters) ;
    }
    catch(error){
        console.log('Fetch failed. Error:', error)
        return null;
    }
  }
  getHamsters();
  }, [])

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
                <Route path='/battle'><Battle hamsters={hamsters ? hamsters : null}/></Route>
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
