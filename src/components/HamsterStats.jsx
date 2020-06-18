import React,{ useState } from 'react';
import { useEffect } from 'react';

const HamsterStats = ({ title, fetchUrl, id}) =>{
    const [hamsters, setHamsters] = useState([]);

    useEffect(() => {
      
            async function getHamsters() {
            try{
                const response = await fetch(fetchUrl)
                const hamstersObject = await response.json();
                setHamsters(hamstersObject.hamsters)
            }
            catch(error){
                console.log('Fetch failed. Error:', error)
                return null;
            }
          }
          getHamsters();
  
    }, [fetchUrl])

    let baseUrl;
    if( process.env.NODE_ENV === 'production' ) {
        // Heroku will know which port to use for pictures when we publish the app
        baseUrl = '/';
    }
    else {  // use this port to fetch pictures from backend in development
        baseUrl = 'http://localhost:2000/';
    }

    let order = 0;

    return (
        <div className='hamster-stats' id={id}>
            <h3>{title}</h3>
            <div className="requested-hamsters" >
               {hamsters.map(h => {
                   order ++
                   return(
                    <div className="single-hamster" key={h.id}>
                    <p> {order}. {h.name}</p>
                    <p><img className='hamster-pic' src={`${baseUrl}assets/${h.imgName}`} alt="hamster-pic" /></p>
                    </div>   
                   )
                    
                })} 
            </div>
            
        </div>
    )
}

export default HamsterStats ;