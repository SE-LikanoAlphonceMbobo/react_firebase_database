import React, { useState } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';


function UpdateRead() {
    // for navigation
  const navigate = useNavigate();  

  let [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map(myFireId => {
        return{
            ...myData[myFireId ],
            fruitId: myFireId 
        }
      })   
      setFruitArray(Object.values(snapshot.val()));
    } else {
      alert("No data found");
    }
  };

  return (
    <div>
       <h1>Display Update Data</h1> 
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruitDefinition} : {item.fruitId}
          </li>
        ))}
      </ul>
      <button className='button1' onClick={() => navigate("/")}>Go Home</button>
      <button className='button1' onClick={() => navigate("/read")}>Go Read Page</button>
    </div>
  );
}

export default UpdateRead;
