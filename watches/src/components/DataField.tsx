type PropsTypes = {
  inputName: string,
  setInputName(e: React.ChangeEvent<HTMLInputElement>): void,
  inputTime: string,
  setInputTime(e: React.ChangeEvent<HTMLInputElement>): void,
  addWatch(e: React.MouseEvent<HTMLButtonElement>): void,
}

const DataField = ({ inputName, setInputName, inputTime, setInputTime, addWatch }: PropsTypes) => {

  return (
    <div className="data-field">
      <div className="input-box">
        <label htmlFor="name" className="data-field_label">
          Название
        </label>
        <input id="name" className="data-field_input" type="text" onChange={setInputName} value={inputName}/>
      </div>
      <div className="input-box">
        <label htmlFor="time" className="data-field_label">
          Временная зона
        </label>
        <input id="time"  className="data-field_input" type="text" onChange={setInputTime} value={inputTime}/>
      </div>
      <button onClick={addWatch}>Добавить</button>
    </div>
  )
}

export default DataField;