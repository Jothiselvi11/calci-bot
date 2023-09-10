import React from 'react';
import './App.css';
//import Chat from './Chat';
import{ Chat} from './Chat';
import { New } from './New';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Calculator Chat</h1>
      </header>
      <main>
        {/* <Chat/> */}
        <New/>
      </main>
    </div>
  );
}

export default App;
