import React,{ useState } from 'react';
import { useEffect } from 'react';

const HamsterStats = ({ title, fetchUrl}) =>{
    const [hamsters, setHamsters] = useState([]);

    useEffect(() => {
      
            async function getHamsters() {
            try{
                const response = await fetch(fetchUrl)
                const hamstersObject = await response.json();
                console.log(hamstersObject.hamsters)
                setHamsters(hamstersObject.hamsters)
            }
            catch(error){
                console.log('Fetch failed. Error:', error)
                return null;
            }
          }
          getHamsters();
  
    }, [])

    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }

    return (
        <section className='hamster-stats'>
            <h3>{title}</h3>
            <div className="requested-hamsters">
               {hamsters.map(h => (
                <div className="single-hamster">
                    <p><img className='hamster-pic' src={`${baseUrl}assets/${h.imgName}`} alt="hamster-pic" /></p>
                    <p>{h.name}</p>
                </div>
                ))} 
            </div>
            
        </section>
    )
}

export default HamsterStats ;