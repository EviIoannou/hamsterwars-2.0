import React, { useState } from 'react';
import { useEffect } from 'react';

const Stats = () =>{
    const [totalGames, setTotalGames] = useState(0)

    useEffect(() =>{

        async function getGames() {
        try{
            const response = await fetch('/api/stats/total')
            const gameObject = await response.json();
            const allGames = gameObject.games;
            console.log(allGames);
         
        }
        catch(error){
            console.log('Fetch failed. Error:', error)
            return null;
        }
      }
      getGames();
      }, [])}
    return (
        <section className="stats">
            <h2>Game statistics</h2>
            <div> Total games:  </div>
            <div> If less than ... games, show statsError.</div>
            <div> Top 5 hamsters (hamsterStats component)</div>
            <div> Bottom 5 hamsters (hamsterStats component)</div>
        </section>
    )
}

export default Stats