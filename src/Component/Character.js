import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Character({ id }) {
    const [character, setCharacter] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:8000/characters/${id}`)
            .then((res) => {
                setCharacter(res.data);
            })
    }, [id]);
    return (
        id !== null ?
            <>
                <form onSubmit={(event) => {
                   
                    Axios.put(`http://localhost:8000/characters/${id}`, { 
                    characterPhysique: character.characterPhysique,
                    characterName: character.characterName,
                    characterSocial: character.characterSocial,
                    characterMental: character.characterMental,
                    characterStory: character.characterStory, })
                        .then(() => console.log('changement confirmée'))
                        .catch((err) => console.log(err)); 
                        event.preventDefault();
                }}
                >

                    <h1>Nom:</h1>
                    
                    <input className="NameCharacter" type="text" name="text" id="text" onChange={(event) => setCharacter({ ...character, characterName: event.target.value })} value={character.characterName} />
                    <h1>Physique:</h1>
                    
                    <input className="NameCharacter" type="number" name="number" id="number" max="50" min="10" onChange={(event) => setCharacter({ ...character, characterPhysique: event.target.value })} value={character.characterPhysique} />

                    <h1>Social:</h1>
                    
                    <input className="NameCharacter" type="number" name="number" id="number" max="50" min="10" onChange={(event) => setCharacter({ ...character, characterSocial: event.target.value })} value={character.characterSocial} />

                    <h1>Mental:</h1>
                    
                    <input className="characterMental" type="number" name="number" id="number" max="50" min="10" onChange={(event) => setCharacter({ ...character, characterMental: event.target.value })} value={character.characterMental} />

                    <h1>Histoire:</h1>
                    <input className="characterStory" type="text" name="text" id="text" onChange={(event) => setCharacter({ ...character, characterStory: event.target.value })} value={character.characterStory} />
                    <button type="submit" className="buttonValider">Valider</button>
                </form>
            </>
            : <p>selectioné un personnage</p>
    )
}

export default Character;
