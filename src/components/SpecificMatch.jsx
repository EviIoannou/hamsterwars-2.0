import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import '../stylings/SpecificMatch.css';
import ContestantInfo from './ContestantInfo';


const SpecificMatch = () =>{
    const { matchId } = useParams();
    const [match, setMatch] = useState('')

    useEffect(() =>{ 
        async function getMatchData(){
            setMatch( await getMatch(matchId))
        }
        getMatchData()
    }, [matchId])

    return( 
        
        <section >
            <div className='specific-match'>
                <div className='match-info'>
                    <p>Game ID: {match.id} </p> 
                    <p>Date: {match.gameDate} </p> 
                    <p>Time: {match.gameTime} </p> 
                    <button className='back-to-matches'>
                <Link to='/matchup'> Back to all match results </Link>
            </button>
                </div>
                            
                <div className="contestants">
                    {match!=='' 
                    ? <><ContestantInfo contestant={match.winner} category='winner' title='Winner'/> 
                        <ContestantInfo contestant={match.loser} category='defeated' title='Defeated'/> 
                    </>
                    :null}
                </div>
            </div>
          
          
        </section>

        )
}

async function getMatch(id) {
    try{
        const response = await fetch(`/api/games/${id}`)
        const matchObject = await response.json();

        return matchObject.game ;
    }
    catch(error){
        console.log('Fetch failed. Error:', error)
        return null;
    }
  }
export default SpecificMatch;