import React from 'react';

const WinnerInfo = ({ winner }) => {
    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }
    return (
        <div className="winner">
                <h3>Winner</h3>
                <p>{winner.name} </p>
                <p><img src={`${baseUrl}assets/${winner.imgName}`} alt="winner"/></p>
                <p>Age: {winner.age}</p>
                <p>Defeats: {winner.defeats}</p>
                <p>Wins: {winner.wins}</p>
         </div>
    )
}

export default WinnerInfo;