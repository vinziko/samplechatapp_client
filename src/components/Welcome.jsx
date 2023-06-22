import React from 'react'
import styled from 'styled-components'
function Welcome({currentUser}) {
  return (
    <Container>
        <img src="" alt="robot"/>
        <h1>
            Welcome <span>{currentUser.username}!</span>
        </h1>
        <h3>Select to the contact to start chating!</h3>
    </Container>
  )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    color:#fff;
    .img{
        height:20rem;
    }
    span{
        color:#4e00ff;
    }
`

export default Welcome