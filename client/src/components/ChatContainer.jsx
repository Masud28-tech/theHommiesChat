import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { sendMessageRoute, getAllMessagesRoute, clearChatMessagesRoute } from '../utils/APIRoutes';

import ChatInput from './ChatInput';
import Logout from './Logout';
import ClearMessages from './ClearMessages';

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        async function fetchAllMessages() {
            const response = await axios.post(getAllMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages(response.data);
        }
        currentChat && fetchAllMessages();
    }, [currentChat])


    const handleSendMessage = async (msg) => {
        if (currentChat && currentUser) {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });

            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                message: msg,
            });

            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
        }
    };

    const handleClearChatMessages = async () => {
        if(currentChat && currentUser){
            await axios.post(clearChatMessagesRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            setMessages([]);
        }
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);

    return (
        <>
            {
                currentChat && (
                    <Container>
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="avatar">
                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="username">
                                    <h3>{currentChat.username}</h3>
                                </div>
                            </div>
                            <div className='header-utils'>
                                <Logout />
                                <ClearMessages clearChatMessages={handleClearChatMessages} messages={messages} />
                            </div>
                        </div>
                        <div className="chat-messages">
                            {
                                messages && messages.map((message, idx) => {
                                    return (
                                        <div ref={scrollRef} key={uuidv4}>
                                            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                                <div className="content">
                                                    <p>{message.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ChatInput sendMessage={handleSendMessage} />

                    </Container>
                )
            }
        </>
    );
};

const Container = styled.div`
    padding-top: 1rem;
    display:grid;
    overflow:hidden;
    grid-template-rows: 10% 75% 15%;
    gap: 0.1rem;
    @media screen and (min-width: 720px) and (max-width: 1080px){
      grid-template-rows: 15% 70% 15%;
    }
    @media screen and (min-width: 420px) and (max-width: 720px){
      grid-template-rows: 15% 70% 15%;
    }
    .chat-header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding: 0 2rem;
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
                    color:white;
                }
            }
        }
        .header-utils{
            display:flex;
            align-items:center;
            flex-direction:row;
            justify-content:center;
            gap:1rem;
        }
    }
    .chat-messages{
        color:white;
        padding: 1rem 2rem;
        display:flex;
        flex-direction:column;
        gap:1rem;
        overflow:auto;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color:#F66B0E;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }

        .message{
            display:flex;
            align-items:center;

            .content{
            max-width:40%;
            overflow-wrap: break-word;
            padding:1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
        }
        }
        .sended{
            justify-content: flex-end;
            .content{
            background-color:#16213E;
            }
        }
        .received{
            justify-content:flex-start;
            .content{
            background-color:#0F3460;
        }
    }
}

`

export default ChatContainer;