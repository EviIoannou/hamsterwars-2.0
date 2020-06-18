import React from 'react'
import '../stylings/Start.css'
import { Link } from 'react-router-dom'

const Start = ()=> {
    return(
        <section className='start'>
            <h2>Welcome to Hamsterwars!</h2>
            <p className='cover'>
                <img src="hamsterwars.jpg" alt="cover-img" className='cover-img'/>
            </p>
            <div  className='start-intro'>
                <h4>Get ready to play!</h4>
                <p> Choose your hamsters to battle in <Link to='/battle'>'Battle' </Link> 
                (random or custom) and click to choose the winner! In <Link to='/matchup'>'Results' </Link> 
                you can see results from previous matches by using the match ID and in <Link to='/stats'>'Statistics' </Link>
                find out the top 5 winning and top 5 defeated contestants. Finally, why not create your
                own hamster at <Link to='/upload'>'Uploads'</Link> to compete in hamsterwars?</p>
            </div>
        </section>
    )
}

export default Start;