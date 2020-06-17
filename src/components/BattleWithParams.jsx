import React from 'react';
import '../stylings/Battle.css';
import BattleForm from './BattleForm';
import BattleContestants from './BattleContestants';
import { useParams } from 'react-router-dom'

const BattleWithParams = () =>{
    const { id1, id2 } = useParams();
    console.log(id1)

    console.log(id2)

    return (
        <section className="battleArea">
            <BattleForm firstOption={id1} secondOption={id2}/>
            <BattleContestants firstId={Number(id1)} secondId={Number(id2)}/>
        </section>
    )
}

export default BattleWithParams;