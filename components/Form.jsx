import "../styles/Form.css"

export default function Form({handleForm,handleInput, handleNumber, newName, number}){
    return <form onSubmit={handleForm}>
    <div className="cont">
      name: <input className="input" type="text" onChange={handleInput} value={newName} />
    </div>
    <div className="cont">
      number: <input className="input" type="number" onChange={handleNumber} value={number} />
    </div>
    <div className="cont">
      <button type="submit">add</button>
    </div>
  </form>
}