import './App.css'
import { useState } from "react"
import DataField from "./components/DataField"

function App() {
  const [inputName, setInputName] = useState('');
  const [inputTime, setInputTime] = useState('');

  const handlerNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value: inputText } } = e;
    setInputName(inputText)
  }

  const handlerTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { target: { value: inputText } } = e;
    console.log(e)
    setInputTime(inputText)
  }

  return (
  <DataField inputName={inputName}
             setInputName={handlerNameChange}
             inputTime={inputTime}
             setInputTime={handlerTimeChange}/>
  )
}

export default App
