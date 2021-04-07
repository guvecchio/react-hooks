// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)

  
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // const [status, setStatus] = React.useState('idle') // Ocioso
  

  // reunir todas as variáveis de estado em um único objeto
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status:'idle' // ocioso
  })

  // Usando desestruturação, podemos acessar os atributos do objeto de estado 
  // por meio de variáveis individuais
  const { pokemon, error, status } = state

  React.useEffect(() => {

    // Sem pokemonName não fazemos nada
    if(pokemonName === '') return

    // Limpando os dados do pokemon e do erro
    // setPokemon(null)
    // setError(null)
    setState({pokemon: null, error: null})

    // fechPokemon e uma função assíncrona.
    // Essas funções podem demorar mais ou menos tempo para serem executadas, e
    // enquanto elas são processadas, a execução do programa principal continua.
    // No caso das funções assíncronas, como não sabemos quando elas
    // terminam, é necessário que elas CHAMEM DE VOLTA o programa principal quando concluírem a execução.
    // O processo de CHAMAR DE VOLTA é denominado CALLBACK.

    // fetchPokemon sendo uma função assíncrona, é necessário providenciarmos a chamada de volta quando
    // ela tiver acabado.
    // Para isso, passamos para ela uma outra função que deve ser chamada de Volta (callback), quando
    // ela estiver pronta.
    // Essa função de callBack é passada no parâmetro then.
    // Tecnicamente, o retorno de uma função assíncrona é chamado de promessa (promisse)
    // Uma promisse suporta dois callBacks:
    // um será chamado (via then) quando a tarefa é concluída com sucesso
    // o outro (via catch) qando a tarefa falha.
    // recebe o erro que foi reportado.


    /* 
    fetchPokemon(pokemonName)
    .then(data => setPokemon(data))       // callBack com o retorno
    .catch(erro => alert(erro.message))   // callBack com o erro
    */

    // uma outra sintaxe para chamar funções assíncronas é por meio das palavras-chave
    // async e await. Neste caso, obrigatoriamente, a chamada assíncrona deve estar dentro de uma função
    // marcada com a palavra-chave async.

    async function getPokemon() {
      try {
        // A chamada à função assíncrona é precedida pela palavra-chave await
        // setStatus('pending') // informações pendentes
        setState({status: 'pending'})
        let data = await fetchPokemon(pokemonName) // chamada assíncrona deve estar
        // setPokemon(data)
        // setStatus('resolved') // requisição remota resolvida com sucesso
        setState({pokemon: data, status: 'resolved'})
      }
      catch(erro) {
        //alert(erro.message)
        // setError(erro)
        // setStatus('rejected') // Requisição remota rejeitada por erro
        setState({error: erro, status: 'rejected'})
      }
    }

    // chamada à função
    getPokemon()


  }, [pokemonName])/* Dependências do useEffect() */

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remove this
  // return 'TODO'


  /*
  if(pokemonName === '') return 'Submit a pokemon'
  else if(error) return (
  <div role="alert">
  There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  </div>
  )
  else if(pokemonName !== '' && pokemon === null)
  return <PokemonInfoFallback name={pokemonName} />
  else
  return<PokemonDataView pokemon={pokemon} />
  }
  */

  switch(status) {
    case 'idle':
      return 'Submit a pokemon'
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      )
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    // case resolved:
    default:
      return <PokemonDataView pokemon={pokemon} />
  }

}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
