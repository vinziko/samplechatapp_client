import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom"
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {registerRoute} from '../utils/APIRoutes'

function Register() {
  const navigate = useNavigate()
  const[values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirm_pass:""
  })
  const toastOptions = {
    possition:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:'light'
  }
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate("/")
    }
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(handleValidation()){
      console.log('invalidation',registerRoute)
      const {password,confirm_pass,username,email} = values;
      const {data} = await axios.post(registerRoute,{
        username,
        email,
        password
      })
      if(data.status === false){
        toast.error(data.message,toastOptions)
      }
      if (data.status === true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate('/')
      }
      
    }
  }
  const handleChange = (e) =>{
    e.preventDefault();
    setValues({...values,[e.target.name]:e.target.value})
  }
  const handleValidation = ()=>{
    const {password,confirm_pass,username,email} = values
    if(password!==confirm_pass){
      toast.error("Password and Confirm Password not match!",toastOptions)
    return false
    }else if(username.length < 3){
      toast.error('Username must be at least 3 characters long!',toastOptions)
      return false
    }else if(password.length < 8){
      toast.error('Password must be at least 8 characters long!',toastOptions)
      return false
    }else if(email === ''){
      toast.error('Please enter your email address',toastOptions)
      return false
    }
    return true
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="brand">
            <img src='' alt='' />
            <h1>Register</h1>
          </div>
            <input 
            type="text" 
            placeholder='Username' 
            name='username' 
            onChange={(e)=> handleChange(e)}
            />
            
            <input 
            type="email" 
            placeholder='Email' 
            name='email' 
            onChange={(e)=> handleChange(e)}
            />

            <input 
            type="password" 
            placeholder='Password' 
            name='password' 
            onChange={(e)=> handleChange(e)}
            />

            <input 
            type="password" 
            placeholder='Password' 
            name='confirm_pass' 
            onChange={(e)=> handleChange(e)}
            />
            <button type="submit">Sign Up!</button>
            <span>Login <Link to="/login">Here!</Link></span>

        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background:#635985;
  .brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
  }
  h1{
    color:#009688;
    text-transform:uppercase;
  }
  form {
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#443C68;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border:0.1rem solid #393053;
      border-radius:0.4rem;
      color:white;
      width:100%;
      font-size:1rem;
      &:focus{
        border:0.1rem solid #18122B;
        outline:none;
      }
    }
    button{
      background-color:#635985;
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
    span{
      color:#009688;
      text-transform:uppercase;
      a{
        color:#4e0eff;
        text-transform:none;
        font-weight:bold;
        text-decoration:none;
      }
    }
  }
`;
export default Register