import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Character({ id }) {
    const [character, setCharacter] = useState([]);

    const notifySuccess = () => toast.success('Enregistrement reussi', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
      const notifyError = () => toast.error('Enregistrement a échoué', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      toast.configure();

    useEffect(() => {
        Axios.get(`http://localhost:8000/characters/${id}`)
            .then((res) => {
                setCharacter(res.data);
            })
    }, [id]);
    
    return (
        id !== null ?
            <div className="labaldivCharacter">
                <form className="labaldivCharacter" onSubmit={(event) => {
                   
                    Axios.put(`http://localhost:8000/characters/${id}`, { 
                    characterPhysique: character.characterPhysique,
                    characterName: character.characterName,
                    characterSocial: character.characterSocial,
                    characterMental: character.characterMental,
                    characterStory: character.characterStory, })
                        .then(() => notifySuccess())
                        .catch((err) => notifyError()); 
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
                    <textarea className="characterStory" onChange={(event) => setCharacter({ ...character, characterStory: event.target.value })} value={character.characterStory}></textarea>
                    <button type="submit" className="buttonValider">Valider</button>
                </form>
            </div>
            : <p>selectioné un personnage</p>
    )
}

export default Character;
