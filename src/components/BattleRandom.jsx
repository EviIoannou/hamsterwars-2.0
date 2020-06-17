import React from 'react';
import '../stylings/Battle.css';

import BattleForm from './BattleForm';
import BattleContestants from './BattleContestants';

const BattleRandom = () =>{
    
    return(
        <section className="battleArea">
            <BattleForm firstOption={"0"} secondOption={"0"}/>
            <BattleContestants firstId={0} secondId={0}/>
        </section>
    )

    }

export default BattleRandom;