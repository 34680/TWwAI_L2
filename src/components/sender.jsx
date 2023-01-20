import React, {useState} from 'react'

const Sender = ({socket}) => {

    const [message, setMessage] = useState("")

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() && localStorage.getItem("userName")) {
            socket.emit("message",
                {
                    text: message,
                    name: localStorage.getItem("userName"),
                   id: `${socket.id}${Math.random()}`,
                   socketID: socket.id
               }
           )
       }
       setMessage("")
   }


    return (
        <div className='chat-footer'>
            <form className='form' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder='Napisz...'
                    className='form-control'
                    value={message}
                   onChange={e => setMessage(e.target.value)}

                />
                <button className="btn btn-primary">Wyślij</button>
            </form>
        </div>
    )
}

export default Sender
