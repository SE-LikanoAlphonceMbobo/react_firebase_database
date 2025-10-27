import React, {useState} from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref,set,push } from 'firebase/database';
 
function Write() {
// creating variables
let [inputValue1, setInputValue1] = useState("");
let [inputValue2, setInputValue2] = useState("");

// save data function 
const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db,"nature/fruits"));
    set(newDocRef, {
      fruitName: inputValue1,
      fruitDefinition: inputValue2
    }).then( () => {
      alert("Data saved Successfully!!!")
    }).catch((error) => {
      alert("error: ", error.message)
    })
}

  return (
    <div>
       <input type='text' value={inputValue1}
       onChange={(e) => setInputValue1(e.target.value)}/>

       <input type='text' value={inputValue2}
       onChange={(e) => setInputValue2(e.target.value)}/><br/>

      <button onClick={saveData}>SAVE DATA</button>
    </div>
  )
}

export default Write