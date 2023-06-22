import React, {useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoSendOutline } from "react-icons/io5"
import {BsEmojiSmileFill} from 'react-icons/bs'

function ChatInput({handleSendMsg}) {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false) 
    const [msg,setMsg] = useState("")

    const handleEmojiPickerHideShow = ()=>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (event)=>{
        
        let message =msg
        message += event.emoji
        setMsg(message)
    }
    const sendChat = (event)=>{
        event.preventDefault();
        if(msg.length>0){
            handleSendMsg(msg)
            setMsg('')
        }
    }
  return (
    <Container>
        <div className='button-container'>
            <div className='emoji'>
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <span><Picker onEmojiClick={handleEmojiClick}/></span>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={(e)=>sendChat(e)}>
            <input type='text' placeholder='message here' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <button className='submit'>
                <IoSendOutline/>
            </button>
        </form>
    </Container>
  )
}
const Container = styled.div`
    display: inline-flex;
    height:10%;
    grid-temple-columns:5%  95%;
    align-items:center;
    bakground-color:;
    padding: 0 2rem;
    padding-bottom:0.3rem;
    @media screen and (min-width:720px) and (max-width:1080px){
        padding:0 1rem;
        gap:1rem;
      }
    .button-container{
        display-flex;
        align-items:center;
        color:#555;
        gap:1rem;
        .emoji{
            position:relative;
            svg{
                font-size:1.5rem;
                color:#F6FA70;
                cursor:pointer;
            }
            span{
                position:absolute;
                top:-450px;
                .EmojiPickerReact{
                    background-color:#4C0070;
                    .epr-body::-webkit-scrollbar{
                        background-color:#160040;
                        width:10px;
                        &-thumb{
                            background-color:#9A0680;
                        }
                    }
                }
                .epr-search{
                    background-color:#4C0070;
                }
                .epr-emoji-category-label{
                    background-color:#4C0070;
                }
            }
        }
    }
    .input-container{
        width:100%;
        margin-left:5px;
        border-radius:2rem;
        display:flex;
        align-content:center;
        gap:2rem;
        background-color:#0A6EBD;
        input{
            width:90%;
            
            background-color:#0A6EBD;
            color:#FFEEBB;
            border:none;
            padding-left:1rem;
            font-size:1.2rem;
            &::selection{
                background-color:#0A6EBD;
            }
            &:focus{
                outline:none;
            }
        }
        button{
            width:10%;
            padding:0.3rem 1rem;
            border-radius:2rem;
            display:flex;
            justify-content:center;
            align-items:center;
            background-color:#0079FF;
            border:none;
            @media screen and (min-width:720px) and (max-width:1080px){
                padding:0.3rem 1rem;
                svg{
                    font-size:5rem;
                }
              }
            svg{
                font-size:2rem;
                color:#FFEEBB;
            }
        }
    }
`
export default ChatInput