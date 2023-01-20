import React, { useEffect, useState, useRef} from 'react'
import Sidebar from './sidebar'
import Content from './content'
import Sender from './sender'

const Page = ({socket}) => {

    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);
 
    useEffect(()=> {
        socket.on("messageResponse", data => setMessages([...messages, data]))
    }, [socket, messages])
 
    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
 

    return (
        <div className="chat">
            <Sidebar socket={socket}/>
            <div className='chat-main'>
                <Content messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
                <Sender socket={socket}/>
            </div>
        </div>
    )
}

export default Page
