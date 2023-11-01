import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

var WebSocket = require('websocket').w3cwebsocket;
var ws = new WebSocket('ws://localhost:8080/', 'echo-protocol');

ws.onerror = function() {
  console.log('Connection Error');
};

ws.onopen = function() {
  console.log('WebSocket Client Connected');

  function sendNumber() {
    if (ws.readyState === ws.OPEN) {
      var message = "Hello Server!!"
      ws.send(message.toString());
      //setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
};

ws.onclose = function() {
  console.log('echo-protocol Client Closed');
};

ws.onmessage = function(e) {
  if (typeof e.data === 'string') {
    console.log("Received: '" + e.data + "'");
  }
};
