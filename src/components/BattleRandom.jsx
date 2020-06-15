import React from 'react';
import '../stylings/Battle.css';
// import HamsterOptions from './HamsterOptions';
// import { Link } from 'react-router-dom';
import BattleForm from './BattleForm';
import BattleContestants from './BattleContestants';

const BattleRandom = () =>{
    
  
    // const [winner, setWinner] = useState('');
    // const [firstId, setFirstId] = useState(0);
    // const [firstContestant, setFirstContestant] = useState('');
    // const [secondId, setSecondId] = useState(0);
    // const [secondContestant, setSecondContestant] = useState('');
    // const [gameId, setGameId]= useState (0);

    // const sameContestantError = firstId===secondId && firstId!==0;
    // const chooseContestants = async () =>{
    //     setWinner('');
    //     setGameId(0);
    //     if (firstId !==0) { setFirstContestant(await getHamster(firstId))}
    //     else if (firstId ===0) {setFirstContestant(await getRandomHamster())
    //     }
        
    //     if (secondId !== 0) { setSecondContestant(await getHamster(secondId))}
    //     else if (secondId === 0) {setSecondContestant(await getRandomHamster())} 
    // }

    //  async function postGame(hamster){
    //   try{
    //     setWinner(hamster)
    //     await postGameData(firstContestant.id, secondContestant.id, hamster.id, setGameId)
    //  }

    //  catch(err){
    //      console.log(err)
    //  }   
    //  }
    
    // useEffect(() =>{
    //     async function getInitialContestants(){
    //     setFirstContestant(await getRandomHamster());
    //     setSecondContestant(await getRandomHamster());
    //     }
    //     getInitialContestants()

    // },[])

   
    // let baseUrl;
    // if( process.env.NODE_ENV === 'production' ) {
    //     // Heroku will know which port to use for pictures when we publish the app
    //     baseUrl = '/';
    // }
    // else {  // use this port to fetch pictures from backend in development
    //     baseUrl = 'http://localhost:2000/';
    // }
    

    return(
        <section className="battleArea">
            <BattleForm firstOption={"0"} secondOption={"0"}/>
            <BattleContestants firstId={0} secondId={0}/>
{/*           
            <div className="choose-contestants">
                <h3>Choose contestants</h3>
                <div className="get-contestants">
                    <select onChange={(e) => {setFirstId(Number(e.target.value))}}>
                        <option value='0'>Random</option>
                        <HamsterOptions />
                    </select>
                    <select onChange={(e) => {setSecondId(Number(e.target.value))}}>
                        <option value='0'>Random</option>
                        <HamsterOptions />
                    </select>
                    
                    <button disabled={sameContestantError} onClick={chooseContestants}> 
                        Go! 
                    </button> 
                </div>
               
                <p className={sameContestantError ? 'error' : null}> 
                    {sameContestantError ? 'Contestants cannot find against themselves!' : null} 
                </p>
            </div> */}

            {/* <h3>Winner is... {winner!== '' ? ` ${winner.name} !` : ''}</h3>
      
            <div className='battle'>
                <div>
                    <img className='hamster-pic' src={`${baseUrl}assets/${firstContestant.imgName}`} alt="first-contestant" 
                    onClick={() => postGame(firstContestant)} 
                    id={winner.id === firstContestant.id? 'active-img' : ''}/>
                    <p className='name'> {firstContestant.name}</p>
                </div>
                <div>                 
                    <img className='hamster-pic' src={`${baseUrl}assets/${secondContestant.imgName}`} alt="second-contestant" 
                    onClick={() => postGame(secondContestant)}
                    id={winner.id === secondContestant.id ? 'active-img' : ''}/>
                    <p className='name'> {secondContestant.name}</p>
                </div>
            </div>
            {gameId!== 0 
                ? <p className="game-id"> 
                    Game with id <Link to={`/matchup/${gameId}`}>{gameId}</Link> was created! 
                    </p> 
                : null} */}
           
        </section>
    )

    }



  
//   async function getHamster(id) {
//     try{
//         const response = await fetch(`api/hamsters/${id}`)
//         const hamsterObject = await response.json();
//         console.log(hamsterObject.hamster)
//         return hamsterObject.hamster ;
//     }
//     catch(error){
//         console.log('Fetch failed. Error:', error)
//         return null;
//     }
//   }

//   function postGameData(first, second, winnerId, setGameId) {
//       const data = { contestants: [{id : first}, {id : second}], winner: winnerId }
//       console.log(data)
//     fetch('api/games', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data);
//         setGameId(data.id)
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }
export default BattleRandom;