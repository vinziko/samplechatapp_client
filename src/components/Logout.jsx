import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Styled from 'styled-components'
import {FiLogOut} from 'react-icons/fi'
function Logout() {
    const navigate = useNavigate()
    const handleClick = async (event) => {
        localStorage.clear()
        navigate('/login')
    }
  return (
    <Button onClick={()=>{handleClick()}}>
    <FiLogOut/>
    </Button>
  )
}
const Button = Styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0.5rem;
    border-radius:0.5rem;
    background-color:#FF0060;
    border:none;
    cursor:pointer;
    svg{
        font-size:1.3rem;
        color:#FFEEBB;
    }
`

export default Logout