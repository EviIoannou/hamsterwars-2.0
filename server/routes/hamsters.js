const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

//GET all hamster data
router.get('/', async(req, res) => {

    let hamsters = [];

    let snapShot = await db.collection('hamsters').get();
    try{
       snapShot.forEach(hamster => {
        hamsters.push(hamster.data())
    })
    res.send(
        {hamsters: hamsters}
    );
  
    }
   catch(err){
       console.error(err)
   }
})

//GET data for random hamster
router.get('/random', async(req, res) => {
    let allHamsters = [];
    let hamsterData = await db.collection('hamsters').get();
  
       hamsterData.forEach(hamster => {
        allHamsters.push(hamster.data())
       })

    let hamster = '';
    let id = Math.floor(Math.random() * allHamsters.length);
    let snapShot = await db.collection('hamsters').where("id", "==", id).get();
    try{
        snapShot.forEach(element => {
         hamster = element.data()
        
     })
     res.send(
         {hamster: hamster}
     ); 
     }
    catch(err){
        console.error(err)
    }
})

//GET data for a hamster with specific id
router.get('/:id', async(req, res) => {
    let hamster = '';
    let snapShot = await db.collection('hamsters').where("id", "==", req.params.id*1).get();
    try{
        snapShot.forEach(element => {
         hamster = element.data()
        
     })
     res.send(
         {hamster: hamster}
     ); 
     }
    catch(err){
        console.error(err)
    }
})

//POST a new hamster!
router.post('/', async (req, res) => {
    let id= req.body.id;
    let name = req.body.name;
    let age = req.body.age;
    let loves = req.body.loves;
    let favFood = req.body.favFood;
    let imgName = req.body.imgName

    //Save the game in a 'hamsters' collection
    await db.collection('hamsters').add({
        id: Number(id),
        name: name,
        age: Number(age),
        loves: loves,
        favFood : favFood,
        imgName: imgName,
        games: 0,
        wins: 0,
        defeats: 0
    })
    
    let hamster ='';
    let hamsterData = await db.collection('hamsters').where("id", "==", id*1).get();
    
    try{
        await hamsterData.forEach(element => {
         hamster = element.data()
        
     })
     res.send({
        msg: `${name} is ready for hamsterwars! `,
        hamster: hamster
    })
    }
   
    catch(err){
        console.error(err)
    }
  
 })


module.exports = router ; 