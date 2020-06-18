import React, { useState, useEffect }   from 'react';
import '../stylings/UploadHamster.css';

const UploadHamster = () =>{
    //get all hamster data in order to check that the new id doesn't already exist
    const [hamsters, setHamsters] = useState(null);
    const [newHamster, setNewHamster] = useState (null);

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [age, setAge] = useState ('');
    const [hobby, setHobby] = useState ('');
    const [favFood, setFavFood] = useState('');
    const [pic, setPic] = useState ('');

    const [nameTouched, setNameTouched] = useState(false);
    const [idTouched, setIdTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState (false);
    const [hobbyTouched, setHobbyTouched] = useState (false);
    const [favFoodTouched, setFavFoodTouched] = useState(false);
    const [picTouched, setPicTouched] = useState (false);

    let [nameClass, nameError] = nameTouched ? validateText(name) : ['', '']
    let [idClass, idError] = idTouched && hamsters!==null ? validateId(id) : ['', '']
    let [ageClass, ageError] = ageTouched ? validateAge(age) : ['', '']
    let [hobbyClass, hobbyError] = hobbyTouched ? validateText(hobby) : ['', '']
    let [favFoodClass, favFoodError] = favFoodTouched ? validateText(favFood) : ['', '']
    let [picClass, picError] = picTouched ? validateFile(pic) : ['', '']

    // if all fields are filled in and they are valid, then the form is valid
    let formIsValid = nameTouched && idTouched && ageTouched && hobbyTouched && favFoodTouched && picTouched
                && (nameError=== '') && (idError === '') && (ageError === '') && (hobbyError === '')
                && (favFoodError === '') && (picError === '')

    useEffect(() =>{
    async function getHamsters() {
    try{
         const response = await fetch('/api/hamsters')
        const hamsterObject = await response.json();
        await setHamsters(hamsterObject.hamsters)
  
        
    }
    catch(error){
        console.log('Fetch failed. Error:', error)
        return null;
    }
    }
    getHamsters();
    }, [idTouched, newHamster])

    return(
        <section className="upload-hamster">
            <h2>Create a new hamster</h2>
            <div className='form-inputs'>
                <div>
                    <label>Name</label> <br/>
                    <input type="text" placeholder="Give your hamster a name"
                    onChange={(e) => {setName(e.target.value)}}
                    onBlur={() => {setNameTouched(true)}}
                    className={nameClass}/>
                    <p className='error'>{nameError}</p>
                </div>
                <div>
                    <label>Id</label> <br/>
                    <input type="text" placeholder="Give your hamster an id"
                    onChange={(e) => {setId(Number(e.target.value))}}
                    onBlur={() => {setIdTouched(true)}}
                    className={idClass}/>
                    <p className='error'>{idError}</p>
                </div>
                <div>
                    <label>Age</label> <br/>
                    <input type="text" placeholder="What's your hamster's age?"
                    onChange={(e) => {setAge(e.target.value)}}
                    onBlur={() => {setAgeTouched(true)}}
                    className={ageClass}/>
                    <p className='error'>{ageError}</p>
                </div>
                
                <div>
                    <label>Hobby</label> <br/>
                    <input type="text" placeholder="What's your hamster's hobby?"
                    onChange={(e) => {setHobby(e.target.value)}}
                    onBlur={() => {setHobbyTouched(true)}}
                    className={hobbyClass}/>
                    <p className='error'>{hobbyError}</p>
                </div>
                <div>
                    <label>Favourite Food</label> <br/>
                    <input type="text" placeholder="What does your hamster love to eat?"
                    onChange={(e) => {setFavFood(e.target.value)}}
                    onBlur={() => {setFavFoodTouched(true)}}
                    className={favFoodClass}/>
                    <p className='error'>{favFoodError}</p>
                </div>
                <div>
                    <label>Picture</label> <br/>
                    <input type="text" placeholder="Upload a picture of your hamster!"
                    onChange={(e) => {setPic(e.target.value)}}
                    onBlur={() => {setPicTouched(true)}}
                    className={picClass}/>
                    <p className='error'>{picError}</p>
                </div>
               
            </div>
   
            <button disabled={!formIsValid} className='post-hamster'
            onClick={() => (formIsValid ? postHamster() : null)}> 
                Create hamster 
            </button>
            <p>{ newHamster!== null 
                ? `${newHamster.name} with ID ${newHamster.id} is ready for hamsterwars!` 
                : null}
            </p>
        </section>
    )

    function validateText(string){
        if(string === '') { 
            return ['invalid', 'This field cannot be empty']}
        else {
            return ['valid', '']
        }
    }
    function validateAge(age) {
        let ageAsNumber = Number(age)
            if (age === '') {return ['invalid', 'This field cannot be empty']}
            else if(ageAsNumber < 1) { return['invalid', 'Your hamster must be older than 0']}
            else if(isNaN(ageAsNumber)) {return ['invalid', 'Age can only include numbers']}
            else if(ageAsNumber % 1 !== 0) {return ['invalid', 'Age can only be an integer']}

            else { return ['valid', '']}
    }

    function validateId(id) {
        let idAsNumber = Number(id)
            if (id === '') {return ['invalid', 'This field cannot be empty']}
            else if(id < 1) { return ['invalid', 'Id needs to be more than 0']}
            else if(isNaN(idAsNumber)) {return ['invalid', 'Id can only include numbers']}
            else if(idAsNumber % 1 !== 0) {return ['invalid', 'Id can only be an integer']}
            else if(hamsters.find(h => h.id === idAsNumber)!== undefined) {return ['invalid', 'Id already exists']}
            
            else { return ['valid', '']}
    }

    function validateFile(picture){
        if(picture === '') { 
            return ['invalid', 'This field cannot be empty']}
        else if(!picture.endsWith('.jpg') && !picture.endsWith('.png')) { 
                return ['invalid', 'Only jpg and png files accepted']}
        else {
            return ['valid', '']
        }
    }
    
async function postHamster() {
   
    const data = { 
        name: name, id: id, age: age, loves: hobby, 
        favFood: favFood, imgName: pic 
    }

  await fetch(`/api/hamsters`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setNewHamster(data.hamster)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

}

export default UploadHamster;

