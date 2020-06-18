import React from 'react';

const Contestant = ({ contestant, category, title }) => {
    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }
    return (
     
            <div className={category} key={contestant.id}>
                <h3>{title}</h3>
                <p>{contestant.name}</p>
                <p className='contestant-img'>
                    <img src={`${baseUrl}assets/${contestant.imgName}`} alt={`${category}`}/>
                </p>
                <p>Age: {contestant.age}</p>
                <p>Defeats: {contestant.defeats}</p>
                <p>Wins: {contestant.wins}</p>
            </div>
    )
}

export default Contestant;