import { useState } from "react";


const DataField = () => {
  const [inputName, setInputName] = useState('');
  const [inputTime, setInputTime] = useState('');

  const inputNameChange = () => {
    
  }


  return (
    <div className="data-field">
      <div className="input-box">
        <label htmlFor="name" className="data-field_label">
          Название
        </label>
        <input id="name" className="data-field_input" type="text" onChange={} value={inputName}/>
      </div>
      <div className="input-box">
        <label htmlFor="time" className="data-field_label">
          Временная зона
        </label>
        <input id="time"  className="data-field_input" type="text" />
      </div>
      <button>Добавить</button>
    </div>
  )
}

export default DataField;