import React, {useState,useEffect} from 'react'
import styled from 'styled-components'


function Contacts({contacts,currentUser,changeChat}) {
    const [currentUserName,setCurrentUserName]=useState(undefined)
    const [currentUserImage,setCurrentUserImage]=useState(undefined)
    const [currentSelected,setCurrentSelected]=useState(undefined)

    const checkcurrentUser = async () => {
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }
    useEffect(() =>{
        checkcurrentUser()
    },[currentUser])
    const changeCurrentChat = (index,contact)=>{
       setCurrentSelected(index)
       changeChat(contact)
    }
   
  return <>
    {
        currentUserImage && currentUserName &&(
            <Container>
                <div className="brand">
                    <img src="" alt="logo"/>
                    <h3>Sample Chat</h3>
                </div>
                <div className="contacts">
                        {
                        contacts.map((contact, index)=>{
                            return(
                                <div
                                className={`contact ${
                                    (index === currentSelected ? 'selected':''
                                )}`}
                                 key={index}
                                 onClick={()=>changeCurrentChat(index,contact)}
                                 >
                                    <div className="avatar">
                                    <img 
                                    src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                    alt='avatar'
                                    />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            ) 
                        })}
                </div>
                <div className='current-user'>
                    <div className="avatar">
                         <img 
                            src={`data:image/svg+xml;base64,${currentUserImage}`} 
                            alt='avatar'
                          />
                          <div className="username">
                            <h2>{currentUserName}</h2>
                          </div>
                     </div>
                </div>
            </Container>
        )
    }
  </>
}
const Container = styled.div`
    display:grid;
    border-radius: 10px 100px / 50px;
    overflow:hidden;
    background-color:#E3F4F4;
    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
            height:2rem;
        }
        h3{
            color:#9AC5F4;
            text-transform:uppercasse;
        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        align-items:center;
        overflow:auto;
        gap:0.8rem;&::-webkit-scrollbar{
            width:0.5rem;
            &-thumb{
                background-color:#9AC5F4;
                width:0.2rem;
                border-radius:1rem;
            }
        }
        .contact{
            background-color:#C4DFDF;
            min-height:5rem;
            width:90%;
            cursor:pointer;
            border-radius:0.2rem;
            padding:0.4rem;
            gap:1rem;
            align-items:center;
            display:flex;
            transition:0.5s ease-in-out;
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
        .selected{
            background-color:#A1C2F1;
        }
    }
    .current-user{
        background-color:#A1C2F1;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:2rem;
        .avatar{
            display:flex;
            img{
                height:3rem;
                max-inline-size:100%;

            }
        }
        .username{
            h2{
                color:#0A6EBD;
            }
        }
        @media screen and (min-width:720px) and (max-width:1080px){
           gap:0.5rem;
           .username{
            h2{
                font-size: 1rem;
            }
           }

          }
    }
`
export default Contacts