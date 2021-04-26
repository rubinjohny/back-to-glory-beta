import React from 'react';
import './App.css';
import {PartOne} from "./containers/PartOne.jsx"
import manutd from './data/manchester-united.png'


import { PartTwo } from './containers/PartTwo';
import { MultipleLineChart } from './components/MultipleLineChart';

function App() {

  

  return (
    <div className="App">
      <header className="App-header">

        <img src={manutd} width={300} />

        <h3>
          Back to Glory - Manchester Utd
        </h3>
        <h4
          className="App-link"
        >
          By Rubin Johny
        </h4>
        <p>
          Manchester united are among the top football teams in the world. A major part of their success was defined by their manager Sir Alex Ferguson over the years 1986-2013. 
          However, Manchester United took a heavy blow after he retired in 2013. The club with the most number of premier league titles has failed to become champions since. 
          Manchester United was managed by top prolific managers including Jose Mourinho, Louis Van Gaal, David Moyes and the current manager Ole Gunnar Solskjaer post Ferguson era. 
          With this project, I intend to study how the team fared under each of the different managers in a story format.
        </p>
      </header>

      <PartOne />

      <PartTwo/>

      
      <div style={{ padding: "50px 50px" }}>
        Footer
      </div>
    </div>
  );


  
}

export default App;
