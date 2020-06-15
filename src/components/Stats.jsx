// import React, { useState } from 'react';
// import { useEffect } from 'react';

// const Stats = () =>{
//     const [totalGames, setTotalGames] = useState(0)

//     // useEffect(() =>{
//     //     // let baseUrl = '/api';
        
//     //     async function getGames() {
//     //     try{
//     //         const response = await fetch(baseUrl + '/api/stats/total')
//     //         const gameObject = await response.json();
//     //         const allGames = gameObject.games;
//     //         console.log(allGames);
//     //         if(allGames.length > 0){
//     //             setLink(allGames[0].id)
//     //             setGames(await allGames.map(g => (
//     //             <option key={g.id} value={g.id}>
//     //                 Game {g.id} : {g.contestants.map(c =>(
//     //                         c.name + (g.contestants.indexOf(c) < g.contestants.length-1 ? ' vs ' : '')
//     //                     ))}
//     //             </option>)
//     //             ))}
//     //     }

//     //     catch(error){
//     //         console.log('Fetch failed. Error:', error)
//     //         return null;
//     //     }
//     //   }
//     //   getGames();
//     //   }, [])
//     return (
//         <section className="stats">
//             <h2>Game statistics</h2>
//             <div> Total games:  </div>
//             <div> Top 5 hamsters (link to top 5)</div>
//             <div> Bottom 5 hamsters (link to bottom 5)</div>
//         </section>
//     )
// }

// export default Stats