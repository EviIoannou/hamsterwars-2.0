import React from 'react';


const HamsterOptions = ({ allHamsters }) =>{

    let hamsterOptions = allHamsters === null ? null : createOptions()

      
      return(
            <>{hamsterOptions}</>
      )

      function createOptions(){
          return allHamsters.map(h => 
                (<option key={h.id} value={h.id} >{h.name}</option>))
      }
}

export default HamsterOptions;