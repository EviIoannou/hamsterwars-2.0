import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const BattleContestants = ({ firstId, secondId }) =>{
    const [winner, setWinner] = useState('');
    const [gameId, setGameId]= useState (0);
    const [firstContestant, setFirstContestant] = useState('');
    const [secondContestant, setSecondContestant] = useState('');
    
      async function postGame(hamster){
      try{
        setWinner(hamster)
        await postGameData(firstContestant.id, secondContestant.id, hamster.id, setGameId)
     }

     catch(err){
         console.log(err)
     }   
     }


    useEffect(() =>{
        async function getContestants () {
            if(firstId === 0 && secondId === 0) {
                setFirstContestant( await getRandomHamster())
                setSecondContestant( await getRandomHamster())
            }
            else if(firstId !==0 && secondId === 0) { 
                setFirstContestant(await getHamster(firstId))
                setSecondContestant(await getRandomHamster())
            }
            else if(firstId === 0 && secondId !== 0) { 
                setFirstContestant(await getRandomHamster())
                setSecondContestant(await getHamster(secondId))
            }
            else if(firstId === secondId && firstId !== 0){
                setFirstContestant('')
                setSecondContestant('')
            }
            else {
                setFirstContestant(await getHamster(firstId))
                setSecondContestant( await getHamster(secondId))  
        }}
        
    getContestants()
      

    },[firstId, secondId])

    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }
    
    return(
        <>
        {firstContestant === secondContestant 
            ? null
            : <h3>Winner is... {winner!== '' ? ` ${winner.name} !` : ''}</h3>}
        
      
        <div className='battle'>
            {firstContestant!=='' 
            ?<div>
                <img className='hamster-pic' src={`${baseUrl}assets/${firstContestant.imgName}`} alt="first-contestant" 
                onClick={() => postGame(firstContestant)} 
                id={winner.id === firstContestant.id? 'active-img' : ''}/>
                <p className='name'> {firstContestant.name}</p>
            </div> 
            :null
            }
            {secondContestant!==''
            ?<div>                 
                <img className='hamster-pic' src={`${baseUrl}assets/${secondContestant.imgName}`} alt="second-contestant" 
                onClick={() => postGame(secondContestant)}
                id={winner.id === secondContestant.id ? 'active-img' : ''}/>
                <p className='name'> {secondContestant.name}</p>
            </div>
            : null
            }
            
        </div>
        {gameId!== 0 
            ? <p className="game-id"> 
                Game with id <Link to={`/matchup/${gameId}`}>{gameId}</Link> was created! 
                </p> 
            : null}
    </>
    )

    async function getRandomHamster() {
        try{
            const response = await fetch('/api/hamsters/random')
            const hamsterObject = await response.json();
            return hamsterObject.hamster ;
        }
        catch(error){
            console.log('Fetch failed. Error:', error)
            return null;
        }
      }
    async function getHamster(id) {
        try{
            const response = await fetch(`/api/hamsters/${id}`)
            const hamsterObject = await response.json();
            return hamsterObject.hamster ;
        }
        catch(error){
            console.log('Fetch failed. Error:', error)
            return null;
        }
  }
      function postGameData(first, second, winnerId, setGameId) {
        const data = { contestants: [{id : first}, {id : second}], winner: winnerId }
        console.log(data)
        fetch('/api/games', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setGameId(data.id)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  }
}

export default BattleContestants;