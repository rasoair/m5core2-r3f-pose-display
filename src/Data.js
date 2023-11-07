import {React, useState, useEffect} from 'react'

const Data = (props) => {
  const [msg, setMsg] = useState({"pitch" : 0, "roll" : 0, "yaw" : 0});

  useEffect(() => {
    // const ws = ""; //for debug
    const ws = new WebSocket('ws://localhost:1880/ws/sensor');

    if(ws === ""){
      console.log("ws is null");
      return;
    }
    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = (event) => {
      if(event && event.data) {
        setMsg(JSON.parse(event.data));
      }
    }

    ws.onclose = (event) => {
      console.log('disconnected(' + event.code + ")");
    }

    ws.onerror = (event) =>{
        console.log("Error " + event);
    }
  }, []);

  props.handleValueChange(msg);

  return (
    <div className="App">
      <h1>M5Core2 姿勢可視化</h1>
      <p>以下計測データ</p>
    </div>
  );
}

export default Data