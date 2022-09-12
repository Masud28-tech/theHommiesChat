import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Logo from '../assets/chat-logo.svg';

const Contacts = ({ contacts, currentUser, chatChange }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [selectedUser, setSelectedUser] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (idx, contact) => {
        setSelectedUser(idx);
        chatChange(contact);
    }

    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h2>Hommies Chat</h2>
                        </div>



                        <div className="contacts">
                            {
                                contacts && contacts.map((contact, idx) => (
                                    <div
                                        className={`contact ${selectedUser === idx ? 'selected' : ''}`}
                                        key={idx}
                                        onClick={() => changeCurrentChat(idx, contact)}
                                    >

                                        <div className="avatar">
                                            <img
                                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="current-user">
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 73% 17%;
    background-color: #F66B0E;
    overflow: hidden;
    gap:0.5rem;

    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 2rem;
        }
        h2{
            color: white;
            text-transform: uppercase;
        }
    }
    .current-user{
        background-color:#06113C;
        display:flex;
        justify-content: center;
        align-items:center;
        border:0.1rem solid black;
        gap:1rem;
        height:13vh;
        .avatar{
            img{
                height: 3rem;
                max-inline-size: 100%;
            }
        }
        .username{
            h2{
                color:white;
            }
        }
    }
    .contacts{
        display:flex;
        flex-direction: column;
        align-items:center;
        overflow: auto;
        gap:0.8rem;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color:#EFEFEF;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .contact{
            display: flex;
            align-items:center;
            background-color: #EFEFEF;
            min-height:5rem;
            width:90%;
            border-radius: 0.2rem;
            padding: 0.5rem;
            gap: 1rem;
            transition:0.5s ease-in-out;
            cursor:pointer;
            .avatar{
                img{
                    height:3rem;
                }
            }
            
        }
        .selected{
                background-color:#3CCF4E;
                color:#EFEFEF;
        }
    }


`

export default Contacts;