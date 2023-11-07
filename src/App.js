import './App.css';
import { useRef, useState } from 'react';
import  {Canvas, useFrame, useLoader} from '@react-three/fiber'
import Data from './Data';

function App() {
  const [data, setData] = useState({"pitch" : 0, "roll" : 0, "yaw" : 0});
  const handleValueChange = (val) => {
    setData(val);
  }

  return (
    <div id="canvas-container">
      <Data handleValueChange={handleValueChange}/>
      <h2> Pitch {data.pitch}</h2>
      <h2> Roll {data.roll}</h2>
      <h2> Yaw {data.yaw}</h2>
      <Canvas style={{ height: '600px' , color : "red"}} c>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <Cube data={data}/>
      </Canvas>
    </div>
  )
}

function Cube ({data}){
  console.log("cube")
  const ref = useRef();
  const prevData = useRef({ "pitch": 0, "roll": 0, "yaw": 0 });
  // useFrame((state, delta) => (ref.current.rotation.x = data.pitch));
  useFrame((state, delta) => {
    const { pitch, roll, yaw } = data;
    const { pitch: prevPitch, roll: prevRoll, yaw: prevYaw } = prevData.current;

    // 差分を計算
    const pitchDiff = pitch - prevPitch;
    const rollDiff = roll - prevRoll;
    const yawDiff = yaw - prevYaw;

    //差分を元に回転
    ref.current.rotation.x += pitchDiff * 0.05;
    ref.current.rotation.y += rollDiff * 0.05;
    ref.current.rotation.z += yawDiff * 0.05;

    prevData.current = { pitch, roll, yaw };
  });

  return (
    //todo : m5core2の3Dモデルに変更
    <mesh ref={ref}>
      <boxGeometry  args={[3,3,1]}/>
      <meshStandardMaterial />
    </mesh>
  )
}

export default App;