import React, { useState, useEffect } from 'react';
import '../stylings/Battle.css';
// import { useParams } from 'react-router-dom';

const Battle = ({ hamsters }) =>{
    // const [{ id1, id2 }] = useParams();
   
    const [winner, setWinner] = useState('');
    const [firstId, setFirstId] = useState(0);
    const [firstContestant, setFirstContestant] = useState('');
    const [secondId, setSecondId] = useState(0);
    const [secondContestant, setSecondContestant] = useState('');

    const hamsterOptions = hamsters.map(h => (<option key={h.id} value={h.id}>{h.name}</option>))

    const chooseContestants = async () =>{
        setWinner('');
        if (firstId !==0) {await setFirstContestant(hamsters.find(h=> h.id === firstId))}
        else if (firstId ===0) {setFirstContestant(await getRandomHamster())}
        
        if (secondId !== 0) {await setSecondContestant(hamsters.find(h=> h.id === secondId))}
        else if (secondId === 0) {setSecondContestant(await getRandomHamster())} 
        console.log(firstContestant + ' ' + secondContestant)
    }

    useEffect(() =>{
        async function getHamsters(){
        setFirstContestant(await getRandomHamster());
        setSecondContestant(await getRandomHamster());
        }
        getHamsters()
    },[])
     
    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }
    
 
    return(
        <section>
            <div className="choose-contestants">
                <select onChange={(e) => {setFirstId(Number(e.target.value))}}>
                    <option value='0'>Random</option>
                    {hamsterOptions}
                </select>
                <select onChange={(e) => {setSecondId(Number(e.target.value))}}>
                    <option value='0'>Random</option>
                    {hamsterOptions}
                </select>
                <button onClick={chooseContestants}> Go! </button>
            </div>

            <h3>Winner is... {winner!== '' ? ` ${winner.name} !` : ''}</h3>
      
            <div className='battle'>
                <div>
                    <img className='hamster-pic' src={`${baseUrl}assets/${firstContestant.imgName}`} alt="first-contestant" 
                    onClick={() =>setWinner(firstContestant)} 
                    id={winner.id === firstContestant.id? 'active-img' : ''}/>
                    <p className='name'> {firstContestant.name}</p>
                </div>
                <div>                 
                    <img className='hamster-pic' src={`${baseUrl}assets/${secondContestant.imgName}`} alt="second-contestant" 
                    onClick={() =>setWinner(secondContestant)} 
                    id={winner.id === secondContestant.id ? 'active-img' : ''}/>
                    <p className='name'> {secondContestant.name}</p>
                </div>
            </div>
        </section>
    )

    }


async function getRandomHamster() {
    let baseUrl = '/api';
    try{
        const response = await fetch(baseUrl + '/hamsters/random')
        const hamsterObject = await response.json();
        console.log(hamsterObject.hamster)
        return hamsterObject.hamster ;
    }
    catch(error){
        console.log('Fetch failed. Error:', error)
        return null;
    }
  }
  
 
export default Battle;