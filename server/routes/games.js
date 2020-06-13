const { Router } = require('express');
const { auth, db } = require('./../firebase');
const { createId, getTimestamp, getPlayer, getWinner, updateData } = 
require('../modules/gameFunctions');

const router = new Router();

//POST a new hamster war!
router.post('/', async (req, res) => {

    let id = createId(4); // give each match an id
    let contestantIds = req.body.contestants; // send contestant id:s to request body
    let contestants=[];

    //loop through the id:s sent and fetch the hamster objects
    for (let i=0; i< contestantIds.length; i++){
       let contestant = await getPlayer(contestantIds[i].id);
        await console.log('contestant: ' + contestant.name)
        await contestants.push(contestant)
    }
    
    let winner = "";
    let losers = [];
    
    winner = await getWinner(req.body.winner); //choose a player id; this player is the winner
    let winnerId = winner.id;

    //losers can be more than one, if contestants are more than two
    contestants.forEach(contestant => {
        try{
          if (contestant.id != winnerId){ //loop through contestants; if id different than the winner's => contestant has lost
            losers.push(contestant);

        }  
        }
        catch(err){
            console.error("error:" + err)
        }
    })

   //update contestants' data with a function from the module gameFunctions
    await updateData(winnerId, 1, 0);
    losers.forEach(loser =>{ //update each defeated hamster
     updateData(loser.id, 0, 1);  
    })
    
    // get winner data again (updated)
    winner = await getPlayer(winnerId) 
    
    //Save the game in a 'games' collection
    await db.collection('games').doc(id).set({
        id: id,
        timeStamp: getTimestamp(), //function to get today's timestamp
        contestants: contestants,
        winner: winner,
        losers: losers
    })

    let game = await db.collection('games').doc(id).get();
    let gameData = game.data();
    
    res.send({
        msg: `Game ${id} is on! `,
        id: gameData.id,
        timeStamp: gameData.timeStamp,
        contestants: gameData.contestants,
        winner: gameData.winner,
        losers: gameData.losers
    })
 })

//GET all games data
router.get('/', async (req, res) => {
    let games = [];

    let snapShot = await db.collection('games').get();
    try{
       snapShot.forEach(game => {
        console.log(game.data())
        games.push(game.data())
        })
        res.send(
            {games: games}
        );
    
    }
   catch(err){
       console.error(err)
   }

})

//GET data for game with requested id
router.get('/:id', async (req, res) => {
    let game = '' ;

    let snapShot = await db.collection('games').where("id", "==", req.params.id).get();

    try{
       snapShot.forEach(element => {
        console.log(element.data())
        game = element.data()
        })
        res.send(
            {game: game}
        );
    
    }
   catch(err){
       console.error(err)
   }

})


module.exports = router;