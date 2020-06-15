import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HamsterOptions from './HamsterOptions';

const BattleForm = ({ firstOption, secondOption}) =>{
    const [allHamsters, setAllHamsters] = useState(null)

    const [secondId, setSecondId] = useState(Number(firstOption));
    const [firstId, setFirstId] = useState(Number(secondOption));
    const sameContestantError = firstId===secondId && firstId!==0;
    let link = sameContestantError ? 'No link' : createLink();

    useEffect(() =>{
        
        async function getHamsters() {
        try{
            const response = await fetch('/api/hamsters')
            const hamsterObject = await response.json();
            console.log(hamsterObject.hamsters)
            await setAllHamsters(hamsterObject.hamsters)
        }
        catch(error){
            console.log('Fetch failed. Error:', error)
            return null;
        }
      }
      getHamsters();
      }, [])
      
    return(
        <div className="choose-contestants">
            <h3>Choose contestants</h3>
            <div className="get-contestants">
                <select value={firstId} onChange={(e) => {setFirstId(Number(e.target.value))}} >
                    <option value='0'>Random</option>
                    <HamsterOptions allHamsters={allHamsters}/>
                </select>
                <select value={secondId} onChange={(e) => {setSecondId(Number(e.target.value))}} >
                    <option value='0'>Random</option>
                    <HamsterOptions allHamsters={allHamsters} />
                </select>

                <button disabled={sameContestantError}> 
                    {link}
                </button> 
            </div>
        
            <p className={sameContestantError ? 'error' : null}> 
                {sameContestantError ? 'Contestants cannot find against themselves!' : null} 
            </p>
    </div>
    )
    function createLink(){
        if(firstId === 0 && secondId === 0) {
            return <Link to='/battle' onClick={() => window.location.reload()}>Go random!</Link> }
        else if(firstId !== 0 || secondId !== 0){
            return <Link to={`/battle/${firstId}/${secondId}`} >Go custom!</Link>
        }
    }
}
 

export default BattleForm;