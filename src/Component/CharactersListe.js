import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Style.css';
import Character from './Character';

function CharactersListe() {
  const [characters, setCharacters] = useState([]);
  const [idCharacter, setIdCharacter]= useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:8000/characters`)
      .then((res) => {
        setCharacters(res.data);
      });

  });
  return (
    <>
      {characters.map((characters) => (
        <div classname='List'>
          <button onClick={()=>
        setIdCharacter(characters.id)
      }>
            {characters.characterName}
          </button>
        </div>
      )
      )}
      <div className='characterLabel'>
        <Character id={idCharacter} />
      </div>
    </>
  );
}

export default CharactersListe;