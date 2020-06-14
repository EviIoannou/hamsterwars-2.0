
const { auth, db } = require('../firebase');

function createId(length) {

    let id = '';
    let chars = '123456789';

    for (let i = 0; i < length; i++) {
        let rand = Math.floor(Math.random() * chars.length);
        id += chars[rand];
    }

    return id;

}

async function getPlayer(playerId){
    try{
    let id = playerId;
    let snapShotOne = await db.collection('hamsters').where("id", "==", id).get();
    let player = '';
    snapShotOne.forEach(element => {
        console.log(element.data())
        player = element.data()
    })

    return player;  
    }

    catch(err){
        console.error(err)
    }
    
}

async function getWinner(winnerId) { //choose a winner among contestants
    try{
        let winner = '';
        let snapShot = await db.collection('hamsters').where("id", "==", winnerId).get();
        snapShot.forEach(element => {
            winner = element.data()
        })
        return winner; 
    }
    catch(err){
        console.error(err)
    }
}

    //Update hamster data for winner and loser
    async function updateData(id, wins, defeats){
        console.log('Start update.')
     
        let docRef = await db.collection('hamsters').where("id", "==", id*1).get();
        
        docRef.forEach(doc =>{
            let hamster = doc.data()
            hamster.wins += wins,
            hamster.defeats += defeats,
            hamster.games ++
    
            db.collection('hamsters').doc(doc.id).update(hamster)
            console.log(`Hamster ${id} updated. Total wins: ${hamster.wins}, total defeats:${hamster.defeats}, total games: ${hamster.games}.`)
        })

    }
    
function gameDate (){
    //get current date for the timestamp
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    
    let date = day + '/' + month + '/' + year ; 
    return date;
}

function gameTime () {
    //get current time for the timestamp
    let today = new Date();
    let hour = (getlength(today.getHours())===2 ? today.getHours() : '0'+ today.getHours() )
    let minutes = (getlength(today.getMinutes())=== 2 ? today.getMinutes() : '0'+ today.getMinutes() )
    let seconds = (getlength(today.getSeconds())=== 2 ? today.getSeconds() : '0'+ today.getSeconds() )

    
    function getlength(number) {
        return number.toString().length;
    }

    let time = hour + ':' + minutes + ':' + seconds;
    return time;

}



module.exports = { createId, gameDate, gameTime, getPlayer, getWinner, updateData }