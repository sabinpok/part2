import { useState } from 'react'

const PersonForm = ({addPerson, newName, newNumber, setNewName, setNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input value={newName} onChange={({ target }) => setNewName(target.value)} />
      </div>
      <div>
        number: 
        <input value={newNumber} onChange={({ target }) => setNewNumber(target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )}
    </div>
  )
}

const Filter = ({filter, setFilter}) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={({ target }) => setFilter(target.value)} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '905-716-0470' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    let check = true
    for (let x = 0; x < persons.length; x++) {
      if(JSON.stringify(persons[x]) === JSON.stringify(nameObject)) {
        check = false
      }
    }

    check
    ? setPersons(persons.concat(nameObject))
    : alert(`${newName} is already added to phonebook`)
    
    setNewName('')
    setNewNumber('')
  }


  const byFilterField = p => p.name.toLowerCase().includes(filter.toLowerCase());
  const personsToShow = filter 
  ? persons.filter(byFilterField) 
  : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm 
        addPerson={addName}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <ul>
      <Persons
        persons={personsToShow}
      />
      </ul>
    </div>
  )
}

export default App

