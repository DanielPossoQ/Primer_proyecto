import { useState, useEffect } from "react"
import "./styles/App.css"
import Form from "./components/Form"
import ShowForm from "./components/ShowForm"
import ShowFilter from "./components/ShowFilter"
import noteService from "./services/index"
import Message from "./components/Message"

export default function App(){
    const [ persons, setPersons ] = useState([
    ])

    const [ newName, setNewName ] = useState('')
    const [ number, setNumber] = useState("")
    const [ filtrado, setFiltrado] = useState("")
    const [ filtredList, setFiltredList ] = useState([])
    const [ sucess, setSucess] = useState("")
    const [show, setShow] = useState(false);

    function handleForm(e){
        e.preventDefault()
        setNewName("")
        setNumber("")
        if(newName !== ""){
          const newContact = {
            name: newName,
            number: number
        }
        const x = persons.find((person) => {
          return person.name == newName
        })
        if(x){
          console.log(x);
          const y = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
          if(y){
            const id = x.id
            const newContact = {
              name: newName,
              number: number
          }
            noteService.update(id,newContact).then(res => {
              alert("the update was sucessful!")
              console.log(res);
            })
          }
          return
        }
        noteService.create(newContact)
        setPersons(persons.concat(newContact));
        setSucess(`${newName} was added to phonebook`)
        setShow(true)
        }
    }

    useEffect(() => {
      noteService
        .getAll()
        .then(response => {
          setPersons(response)
        })
    }, [callDelete])
  
    const handleInput = (e) => {
        setNewName(e.target.value)
    }

    const handleNumber = (e) => {
      setNumber(e.target.value)
    }

    const handleFiltrado = (e) => {
      const searchTerm = e.target.value; // Capture the input value
      setFiltrado(searchTerm); // Update the state with the new search term
      const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())); // Filter the persons based on the search term
      setFiltredList(filteredPersons); // Log the filtered persons to the console
    };


    function callDelete(id){
        noteService.eliminate(id).then(returnedPerson => {
          noteService.getAll(res => {
            setPersons(res)
          })
          console.log(Object.toString(persons.filter(n => n.id !== id)))
    }).catch(err => {
      alert("the contact was already deleted"),
      setPersons(persons.filter(n => n !== id))
    })
  }



    return (
      <div>
        <Message setShow={setShow} show={show} message={sucess}/>
        <h2>Phonebook</h2>
        <Form handleForm={handleForm} handleInput={handleInput} handleNumber={handleNumber} newName={newName} number={number} />
        <h2>Numbers</h2>
        <ShowForm callDelete={callDelete} persons={persons}/>
        <h2>Filtrado</h2>
        <ShowFilter handleFiltrado={handleFiltrado} filtrado={filtrado} filtredList={filtredList} />
      </div>
    )
  }
