import React, { useState, useEffect } from 'react';
import '../stylings/Battle.css';
import HamsterOptions from './HamsterOptions';
// import { useParams } from 'react-router-dom';

const Battle = () =>{
    // const [{ id1, id2 }] = useParams();
  
    const [winner, setWinner] = useState('');
    const [firstId, setFirstId] = useState(0);
    const [firstContestant, setFirstContestant] = useState('');
    const [secondId, setSecondId] = useState(0);
    const [secondContestant, setSecondContestant] = useState('');

    const chooseContestants = async () =>{
        setWinner('');
        if (firstId !==0) { setFirstContestant(await getHamster(firstId))}
        else if (firstId ===0) {setFirstContestant(await getRandomHamster())}
        
        if (secondId !== 0) { setSecondContestant(await getHamster(secondId))}
        else if (secondId === 0) {setSecondContestant(await getRandomHamster())} 
    }

    useEffect(() =>{

        async function getInitialContestants(){
        setFirstContestant(await getRandomHamster());
        setSecondContestant(await getRandomHamster());
        }
        getInitialContestants()

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
        <section className="battleArea">
          
            <div className="choose-contestants">
                <h3>Choose contestants</h3>
                <select onChange={(e) => {setFirstId(Number(e.target.value))}}>
                    <option value='0'>Random</option>
                    <HamsterOptions />
                </select>
                <select onChange={(e) => {setSecondId(Number(e.target.value))}}>
                    <option value='0'>Random</option>
                    <HamsterOptions />
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
    try{
        const response = await fetch('api/hamsters/random')
        const hamsterObject = await response.json();
        console.log(hamsterObject.hamster)
        return hamsterObject.hamster ;
    }
    catch(error){
        console.log('Fetch failed. Error:', error)
        return null;
    }
  }
  
  async function getHamster(id) {
    try{
        const response = await fetch(`api/hamsters/${id}`)
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