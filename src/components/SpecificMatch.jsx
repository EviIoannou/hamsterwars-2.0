import React from 'react';
import { useParams } from 'react-router-dom';

const SpecificMatch = () =>{
    const { matchId } = useParams();
    const id = Number(matchId)

    return( 
        <section className='specific-match'>
            <p>Game ID: {id}</p>
        </section>
        )
}

export default SpecificMatch;