import './App.css';
import React from "react";
import Axios from 'axios';
// import { response } from 'express';
function App() {
  const [pokemonName, setPokemonName] = React.useState("");
  const [pokechosen, setpokechosen] = React.useState(false);
  const [pokemone, setPokemon] = React.useState({
    name: "",
    image: "",
    type: "",
    hp: "",
    attack: "",
    defense: "",
    weight: "",
    moves: {
      ab1: "",
      ab2: "",
      ab3:""
    }});
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((res) => {
      console.log(res);
      setPokemon({
        name: res.data.species.name,
        image: res.data.sprites.front_default,
        type: res.data.types[0].type.name,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        weight: res.data.weight,
        moves: {
          ab1: res.data.moves[0].move.name,
          ab2: res.data.moves[1].move.name,
          ab3:res.data.moves[2].move.name
        }
      });
      setpokechosen(true);
  });
  } 
  return (
    <div className="App">
      <div className='titleSec'>
        <h1>PokeDEX</h1>
        <input type='text' onChange={(e) => { setPokemonName(e.target.value)}}/>
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='pokeinfo'>
        {!pokechosen ? (<h1> Choose a pokemon</h1>) : (
          <>
            <h1>{pokemone.name}</h1>
            <img src={pokemone.image} />
            <h3>Type: {pokemone.type}</h3>
            <h3>Weight: {pokemone.weight}</h3>
            <h3>HP: {pokemone.hp}</h3>
            <h3 >Attack: {pokemone.attack} <i>{pokemone.attack>50 ? <>+</>:<>-</>}</i></h3>
            <h3>Defense: {pokemone.defense}</h3>
            <h3>Moves: {pokemone.moves.ab1}, {pokemone.moves.ab2}, {pokemone.moves.ab3}</h3>
          </>
        )
        }
      </div>
    </div>
  );
}

export default App;


