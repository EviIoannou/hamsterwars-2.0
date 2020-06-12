import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylings/Matches.css';


const AllMatches = () =>{
    const [games, setGames] = useState(null)
    useEffect(() =>{
        let baseUrl = '/api';
        
        async function getGames() {
        try{
            const response = await fetch(baseUrl + '/games')
            const gameObject = await response.json();
            const allGames = gameObject.games;
            console.log(allGames);
            if(allGames.length > 0){
                setGames(await allGames.map(g => (
                <option key={g.id} value={g.id}>
                    Game {g.id} : {g.contestants.map(c =>(
                            c.name + (g.contestants.indexOf(c) < g.contestants.length-1 ? ' vs ' : '')
                        ))}
                </option>)
                ))}
            

        }
        catch(error){
            console.log('Fetch failed. Error:', error)
            return null;
        }
      }
      getGames();
      }, [])
      
    return( 

        <div className='all-matches'>
            {games!== null ? <select className="choose-match">{games}</select> 
            : <p className='no-matches-msg'> No match data available yet. Start a new match 
                <Link to ="/battle"> here </Link>!
            </p>}
            
        </div>
    
    )
}

export default AllMatches;