import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Title = () => {
  return (
    <h1>
      React Jango test
    </h1>
  )
}


const InstructorsList = ({ instructors }) => {
  return instructors.length > 0 ? (
    <div>
      <h2>Instructors</h2>
      {instructors.map(inst => {
        return (
          <>
          <div key={inst.id}> {inst.id} - {inst.name} </div>
          </>
        )
      })}
    </div>
  ) : (
    <div> Loading… </div>
  )
}

const DeleteInstrctor = () => {

}
const EditInstructor = ( { getInstructors }) => {
  const [idNum, setIdNum] = useState(0)  
  const [name, setName] = useState('')

    const EditThisInstructor = () => {

      if (!name) {
        return
      }
      axios.put(`http://127.0.0.1:8000/instructors/${idNum}/`, {name: name})
        .then(response => {
          console.log('Response: ', response)
          setIdNum(0)
          setName('')
          getInstructors()
        })
        .catch(error => console.log('Error: ', error))
    }
    return (
      <div>
        <h2>Update Instructor</h2>
        <input onChange={e => setIdNum(e.target.value)} type="number" value={idNum} />
        <input onChange={e => setName(e.target.value)} placeholder='Enter new name' value={name} />
        <button onClick={()=> EditThisInstructor}>
          Update
        </button>
      </div>
    )
}

const NewInstructor = ({getInstructors}) => {
  const [name, setName] = useState('')

  const createInstructor = () => {
    axios.post('http://127.0.0.1:8000/instructors/', {
      name: name
    })
    .then(response => {
      console.log('Response', response)
      if (response.status === 200) {
        setName('')
        getInstructors()
      }
    })
    .catch(error => console.log('ERROR', error))
  }
  return (
    <div>
      <h2>Create A New Instructor</h2>
      <input 
      onChange={e=> setName(e.target.value)}
      placeholder="enter name"
      value={name}

      />
      <button onClick={() => createInstructor()}>
        Create Instuctor
      </button>
    </div>
  )
}



function App() {
  const [instructors, setInstructors] = useState([])

  useEffect(() => {
    getInstructors()

  }, [])

  const getInstructors = () => {
    console.log('test')
    axios.get('http://127.0.0.1:8000/instructors/')
    .then(response => {
      setInstructors(response.data)
      console.log('response', response)
    })
    .catch(error => console.log('Error: ', error))
  }

  return (
    <div className="p-5">
      <InstructorsList instructors={instructors}/>
      <NewInstructor getInstructors={getInstructors} />
      <EditInstructor getInstructors={getInstructors} />
    </div>
  )
}


export default App
