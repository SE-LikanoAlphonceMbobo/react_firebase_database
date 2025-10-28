import React, { useState } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';


function Read() {
    // for navigation
  const navigate = useNavigate();

  const [fruitArray, setFruitArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      setFruitArray(Object.values(snapshot.val()));
    } else {
      alert("No data found");
    }
  };

  return (
    <div>
      <h1>Read Data</h1>
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}>
            {item.fruitName}: {item.fruitDefinition}
          </li>
        ))}
      </ul>
          <button className='button1' onClick={() => navigate("/")}>Go Home Page</button>
          <button className='button1' onClick={() => navigate("/updateread")}>Go Update Read Page</button>
    </div>
  );
}

export default Read;
