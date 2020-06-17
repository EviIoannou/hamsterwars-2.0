import React from 'react';
import { Link } from 'react-router-dom';

const StatsError = () => {
    return(
        <div className="stats-error">
            <p>There need to be more than 10 matches to see statistics 
                about most winning and most defeated hamsters.</p>
            <p>Start a new hamsterwar <Link to ="/battle"> here </Link> !</p>
        </div>
    )
}

export default StatsError;