import React from 'react';

const LosersInfo = ({ losers }) => {
    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }
    return (
        losers.map (l => (
            <div className="defeated">
                <h3>Defeated</h3>
                <p>{l.name}</p>
                <p><img src={`${baseUrl}assets/${l.imgName}`} alt="defeated-hamster"/></p>
                <p>Age: {l.age}</p>
                <p>Defeats: {l.defeats}</p>
                <p>Wins: {l.wins}</p>
            </div>)) 
    )
}

export default LosersInfo;