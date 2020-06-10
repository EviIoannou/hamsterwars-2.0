import React, { useState } from 'react';
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

    setFirstContestant(hamsters.find(h=> h.id === firstId)) 
    setSecondContestant(hamsters.find(h=> h.id === secondId))
    
    if(firstContestant === secondContestant !== 0){
        console.log(firstContestant + 'cannot fight against himself!')
    }
    return(
        <section>
            <form>
                <select onChange={(e) => {setFirstId(Number(e.target.value))}}>
                    <option value='0'>Random</option>
                    {hamsterOptions}
                </select>
                <select onChange={(e) => {setSecondId(Number(e.target.value))}}>
                    <option value='0'>Random</option>
                    {hamsterOptions}
                </select>
                {/* on click, send the id:s to parameters back to App */}
                <button> Go! </button>
            </form>

            <h3>Winner is... {winner!== '' ? `hamster ${winner} !` : ''}</h3>
            {/* render div with the two contestants; will start with random */}
            <div className='battle'>
                <div>
                    <img className='hamster-pic' src="hamster-2.jpg" alt="first-contestant" 
                    onClick={() =>setWinner(1)} id={winner ===1 ? 'active-img' : ''}/>
                    <p className='name'> Hamster 1</p>
                </div>
                <div>                 
                    <img className='hamster-pic' src="hamster-3.jpg" alt="second-contestant" 
                    onClick={() =>setWinner(2)} id={winner ===2 ? 'active-img' : ''}/>
                    <p className='name'> Hamster 2</p>
                </div>
            </div>
        </section>
    )
}

export default Battle;