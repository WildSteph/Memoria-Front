import React, {useEffect, useState} from 'react';
import Axios from 'axios';

function CharactersListe () {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    Axios.get(`http://localhost:8000/characters`)
    .then((res) => {
      setCharacters(res.data);
    });
    
  });
  return (
    characters.map((character) => (
    character.characterName
    )
    ));   
}

export default CharactersListe ;