import React, { useEffect } from 'react';
import { useState } from 'react';

const HamsterOptions = () =>{
    const [hamsterOptions, setHamsterOptions] = useState(null)
    useEffect(() =>{
        let baseUrl = '/api';
        
        async function getHamsters() {
        try{
            const response = await fetch(baseUrl + '/hamsters')
            const hamsterObject = await response.json();
            console.log(hamsterObject.hamsters)
            setHamsterOptions(await hamsterObject.hamsters.map(h => (<option key={h.id} value={h.id}>{h.name}</option>)))

        }
        catch(error){
            console.log('Fetch failed. Error:', error)
            return null;
        }
      }
      getHamsters();
      }, [])
      
      
      return(
            <>{hamsterOptions}</>
      )
}

export default HamsterOptions;