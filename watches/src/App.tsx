import './App.css'
import { useState } from "react"
import DataField from "./components/DataField"
import Watch from './components/Watch';
import CifralWatch from './components/CifralWatch';
import Watches from './components/Watches';
import moment from 'moment';

function App() {
  const [inputName, setInputName] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [watches, setWatches] = useState([]);

  const handlerNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value: inputText } } = e;
    setInputName(inputText)
  }

  const handlerTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value: inputText } } = e;
    setInputTime(inputText)
  }

  const addWatch = (): void => {
    const newWatches = watches.concat({sity: {inputName}, timeZone: Number(inputTime)});
    setWatches(newWatches);
    console.log(watches)
  }

  return (
    <>
      <DataField inputName={inputName}
                setInputName={handlerNameChange}
                inputTime={inputTime}
                setInputTime={handlerTimeChange}
                addWatch={addWatch}/>
      <Watches>
        <CifralWatch/>
      </Watches>

    </>
  
  )
}

export default App
