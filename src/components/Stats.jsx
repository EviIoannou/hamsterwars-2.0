import React, { useState, useEffect } from 'react';
import HamsterStats from './HamsterStats';
import '../stylings/Stats.css';
import StatsError from './StatsError';

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
           
            <div className="total-games"> 
            <p>Total matches:  {totalGames}</p> 
            </div>
            {totalGames < 10
            ?<StatsError />
            :<><div className="top-bottom-hamsters">
                    <HamsterStats title='Top 5 - most wins' fetchUrl='/api/charts/top' id='top'/>
                    <HamsterStats title='Top 5 - most defeats' fetchUrl='/api/charts/bottom' id='bottom'/>
                </div></>}
  
        </section>
    )
}

export default Stats