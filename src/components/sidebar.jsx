import React, {useState, useEffect} from 'react'

const Sidebar = ({socket}) => {

    const [users, setUsers] = useState([])

   useEffect(()=> {
       socket.on("newUserResponse", data => setUsers(data))
   }, [socket, users])


    return (
        <div className='chat-sidebar'>
            <h2>chat</h2>
            <div>
                <h4  className='chat-header'>Połączono</h4>
                <div className='chat-users'>
                {users.map(user => <p key={user.socketID}>{user.userName}</p>)}

                </div>
            </div>
        </div>
    )
}

export default Sidebar
