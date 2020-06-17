import React, { useState, useEffect } from 'react';
import HamsterStats from './HamsterStats';
import '../stylings/Stats.css'
const Stats = () =>{
    const [totalGames, setTotalGames] = useState(0)

    useEffect(() =>{

        async function getGames() {
        try{
            const response = await fetch('/api/stats/total')
            const gameObject = await response.json();
            console.log(gameObject)
            setTotalGames(gameObject.totalGames)
        }
        catch(error){
            console.log('Fetch failed. Error:', error)
            return null;
        }
      }
      getGames();
      }, [])

    return (
        <section className="stats">
            <h2>Game statistics</h2>
            <div> Total games:  {totalGames}</div>
            {totalGames < 10 ? 'No stats' : 'Yay stats'}
            <div className="top-bottom-hamsters">
              <HamsterStats title='Top 5' fetchUrl='/api/charts/top'/>
              <HamsterStats title='Bottom 5' fetchUrl='/api/charts/bottom'/>  
            </div>
        </section>
    )
}

export default Stats