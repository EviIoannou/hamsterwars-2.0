import React from 'react';

const LosersInfo = ({ loser }) => {
    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }
    return (
     
            <div className="defeated" key={loser.id}>
                <h3>Defeated</h3>
                <p>{loser.name}</p>
                <p><img src={`${baseUrl}assets/${loser.imgName}`} alt="defeated-hamster"/></p>
                <p>Age: {loser.age}</p>
                <p>Defeats: {loser.defeats}</p>
                <p>Wins: {loser.wins}</p>
            </div>
    )
}

export default LosersInfo;