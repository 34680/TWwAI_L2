import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        socket.emit("newUser", {userName, socketID: socket.id})
        navigate("/chat")
    }
    return (
        <form className='home-container' onSubmit={handleSubmit}>
            <h2 className='home-header'>Dołącz</h2>
            <label htmlFor="username">Nazwa</label>
            <input type="text"
                   minLength={3}
                   name="username"
                   id='username'
                   className='username-input'
                   value={userName}
                   onChange={e => setUserName(e.target.value)}
            />
            <button className='home-cta btn btn-primary'>Ok</button>
        </form>
    )
}

export default Home
