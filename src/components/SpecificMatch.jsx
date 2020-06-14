import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../stylings/SpecificMatch.css';
import LosersInfo from './LosersInfo';
import WinnerInfo from './WinnerInfo';


const SpecificMatch = () =>{
    const { matchId } = useParams();
    const [match, setMatch] = useState('')

    console.log(match.contestants)
    console.log(match.winner)
    console.log(match.losers)

    useEffect(() =>{ 
        async function getMatchData(){
            setMatch( await getMatch(matchId))
        }
        getMatchData()
    }, [matchId])

    return( 
        
        <section className='specific-match'>
            <div className='match-info'>
               <p>Game ID: {match.id} </p> 
               <p>Date: {match.gameDate} </p> 
               <p>Time: {match.gameTime} </p> 
            </div>
            
            <div className="contestants">
                {match!=='' ? <WinnerInfo winner={match.winner}/> : null}
                {match!=='' ? <LosersInfo losers={match.losers}/> : null}
                
            </div>
        </section>

        )
}

async function getMatch(id) {
    try{
        const response = await fetch(`/api/games/${id}`)
        const matchObject = await response.json();
        console.log(matchObject.game)
        console.log(matchObject.game.winner.name)
        return matchObject.game ;
    }
    catch(error){
        console.log('Fetch failed. Error:', error)
        return null;
    }
  }
export default SpecificMatch;