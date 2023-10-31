import './App.css';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [msg, setMsg] = useState({"pitch" : 0, "roll" : 0, "yaw" : 0});

  useEffect(() => {
  const ws = new WebSocket('ws://localhost:1880/ws/sensor');
  ws.onopen = () => {
    console.log('connected');
  };

  ws.onmessage = (event) => {
    if(event && event.data) {
      console.log(event.data);
      setMsg(JSON.parse(event.data));
    }
  }

  ws.onclose = (event) => {
    console.log('disconnected(' + event.code + ")");
  }

  ws.onerror = (event) =>{
      console.log("Error " + event);
  };;

  }, []);

  return (
    <div className="App">
      <h1>しせいけいそく</h1>
      <p>pitch {msg.pitch}</p>
      <p>roll {msg.roll}</p>
      <p>yaw {msg.yaw}</p>
    </div>
  );
}

export default App;
