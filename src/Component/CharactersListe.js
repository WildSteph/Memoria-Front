import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Style.css';
import Character from './Character';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';


function CharactersListe() {
  const [characters, setCharacters] = useState([]);
  const [idCharacter, setIdCharacter] = useState(null);


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

  function newCharacter() {
    Axios.post('http://localhost:8000/characters', {
      characterName: 'nouveau personnage', characterPhysique: '10', characterMental: '10', characterSocial: '10', characterStory: 'crée votre histoir!'
    })
      .then(
        (res) => {
          notifySuccess();
        },
      )
      .catch(
        (err) => notifyError(),
      )
  }



  useEffect(() => {
    Axios.get(`http://localhost:8000/characters`)
      .then((res) => {
        setCharacters(res.data);
      }, [characters]);

  });
  const [value, setValue] = React.useState(null);
  return (
    <div class="characterList">
      <div class="menuList">
        <h1 className="titre">Memoria</h1>

        <div className="Searchbar">
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            value={value}
            onChange={(event, newValue) => {
              setIdCharacter(newValue.id);
            }}
            getOptionSelected={(option, value) => option.characterName === value.characterName}
            getOptionLabel={(option) => option.characterName}
            options={characters}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: 'search' }}
              />
            )}
          />
        </div>


        <button className="newCharacter" onClick={() => newCharacter()
        }
        >nouveau personnage
    </button>
        {
          characters.map((characters) => (
            <div classname='List'>
              <button className="buttonCharacter" onClick={() =>
                setIdCharacter(characters.id)
              }>
                {characters.characterName}
              </button>
            </div>

          )
          )
        }
      </div>
      <div className='characterLabel'>
        <Character id={idCharacter} />
        <ToastContainer />
      </div>
      <div className="imageandtexte">
        <img className="image" src="https://cdn.discordapp.com/attachments/579975690120724501/635866155487199232/11-34-44-16378_eUJiLYBD.png" />
        <p className="texteImage">Pense à bien te relire.</p>
      </div>
    </div>
  );
}

export default CharactersListe;