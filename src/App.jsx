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

function App() {
  const [instructors, setInstructors] = useState([])

  useEffect(() => {
    getInstructors()

  }, [])

  const getInstructors = () => {
    console.log('test')
    axios.get('http://127.0.0.1:8000/instructors/')
  }

  return (
    <div className="p-5">
      <Title />
      
    </div>
  )
}


export default App
