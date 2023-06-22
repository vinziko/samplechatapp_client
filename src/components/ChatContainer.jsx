import axios from 'axios'
import React ,{useState,useEffect,useRef}from 'react'
import styled from 'styled-components'
import {sendMessageRoute,getAllMessagesRoute} from '../utils/APIRoutes'
import Logout from './Logout'
import ChatInput from './ChatInput'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';


function ChatContainer({currentChat,currentUser,socket}) {
    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef();

    const checkresponse = async ()=>{
        if(currentUser === undefined){return}
        const response = await axios.post(getAllMessagesRoute,{
            from:currentUser._id,
            to:currentChat._id,
        })

        setMessages(response.data)
    } 

    useEffect(() => { 
        checkresponse()
    },[currentChat])

    const handleSendMsg = async (msg)=>{
        await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })
        socket.current.emit('send-msg',{
            from:currentUser._id,
            to:currentChat._id,
            message:msg,
        })
        const msgs = [...messages]
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)
    }

    const socketCurrent = ()=>{
        if(socket.current){
            socket.current.on('msg-recieve',(msg)=>{
                setArrivalMessage({fromSelf:false,message:msg})
            })
        }
    }
    useEffect(() => {
        socketCurrent()
    },[])

    const checkArrival = ()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
    }
    useEffect(() => {
        checkArrival()
    },[arrivalMessage])

    const checkScrol = ()=>{
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }
    useEffect(() => {
        checkScrol()
    },[messages])
  return (
    <>
    {
        currentChat &&(
        <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img 
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                        alt='avatar'
                    />
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>
            <Logout/>
        </div>
        <div className='chat-messages'>
            {
                messages.map((message)=>{
                    return(
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? ' sended':' recieved'}`}>
                                <div className='content'>
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
        )
    }
    </>
  )
}
const Container = styled.div`
padding-top:1rem;
display:grid;
grid-template-rows:20% 60% 20%;
gap:0.1rem;
overflow:hidden;
@media screen and (min-width:720px) and (max-width:1080px){
    grid-auto-rows:15% 70% 15%;
  }
.chat-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 2rem;
    .user-details{
       display:flex;
       align-items:center;
       gap:1rem;
       .avatar{
          img{
            height:3rem;
          }
       }
       .username{
          h3{
            color:#0A6EBD;
          }
       }
    }
}
.chat-messages{
    padding:1rem 2 rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    gap:0.8rem;&::-webkit-scrollbar{
        width:0.5rem;
        &-thumb{
            background-color:#5A96E3;
            width:0.2rem;
            border-radius:1rem;
        }
    }
    .message{
        display:flex;
        align-items:center;
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            font-size:1.1rem;
            
            color:#FFEEBB;
        }
    }
    .sended{
        justify-content:flex-end;
        .content{
            border-radius: 10px 100px / 120px;
            background-color:#0A6EBD;
        }
    }
    .recieved{
        justify-content:flex-start;
        .content{
            border-radius: 10px 100px / 120px;
            background-color:#5A96E3;
        }
    }
    
}
`
export default ChatContainer