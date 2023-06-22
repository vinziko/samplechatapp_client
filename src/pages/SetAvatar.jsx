import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom"
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {setAvatarsRoute} from '../utils/APIRoutes'
import { Buffer } from 'buffer'
import loadingImg from './giphy.gif'
export default function SetAvatar(){
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate()
    const [avatars,setAvatars] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [selectedAvatar,setSelectedAvatar] = useState(undefined)

    const toastOptions = {
        possition:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'light'
      }

      useEffect(() => {
        if(!localStorage.getItem('chat-app-user')){
          navigate("/login")
        }
      },[])

      const setProfilePicture = async () =>{
        if(selectedAvatar === undefined){
            toast.error('Please select avatar',toastOptions)
        }else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'))
            const {data} = await axios.post(`${setAvatarsRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            })
            if(data.isSet){
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem('chat-app-user',JSON.stringify(user))
                navigate('/')
            }else{
                toast.error('Please try again and chose avatar',toastOptions)
            }
        }
        
      }
      const check = async ()=>{
        const data = []
        for (let i= 0;i<4;i++){
            const image = await axios.get(
                `${api}/${Math.round(Math.random()*1000)}`)
            const buffer = new Buffer(image.data)
            data.push(buffer.toString('base64'))
        }
        setAvatars(data)
        setIsLoading(false)
      }
        useEffect(() =>{
            check()
        }, [])
    return(
        <>
        {
            isLoading ? <Container>
                <img src={loadingImg} alt='loading' className='loader'/>
            </Container>:
            <Container>
            <div className="title-container">
                <h1>
                    Pick your avatar!
                </h1>
            </div>
            <div className="avatars">
            {avatars.map((avatar,index)=>{
                return (
                    <div key={index} className={`avatar ${setSelectedAvatar === index ? 'selected':''}`}>
                        <img src={`data:image/svg+xml;base64,${avatar}`} 
                        alt='avatar'
                        onClick={()=>setSelectedAvatar(index)}/>
                    </div>
                )
            })}
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Start</button>
            </Container>
                
            
        }
        
        <ToastContainer/>
        </>
    )
    
  
}
const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:3rem;
    background-color:#635985;
    height:100vh;
    width:100vw;
    .loader{
        max-inline-size:100%;
    }
    .title-container{
        h1{
            color:#009688;
            text-transform:uppercase;
        }
    }
    .avatars{
        display:flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition: 0.5s ease-in-out;
            img{
                height:6rem;
            }
        }
        .selected{
            border:0.4rem solid #443C68;
        }
    }
    .submit-btn{
        background-color:#443C68;
        color:white;
        padding: 1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover{
          background-color:#393053;
        }
    }
`