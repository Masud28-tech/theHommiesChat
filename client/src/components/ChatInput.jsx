import {useState} from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';

const ChatInput = ({sendMessage}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerToggler = () => {
    setShowEmojiPicker(!showEmojiPicker);
  } 

  const handleEmojiClick = (event, emoji) => {
      event.preventDefault();
      let msg = message;
      msg += emoji.emoji;
      setMessage(msg);
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerToggler}/>
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
          }
        </div>
      </div>
      <form className="input-container" onSubmit={handleSendMessage}>
        <input type="text" placeholder='Type your message here' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="send">
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display:grid;
  grid-template-columns: 5% 95%;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  padding:0 2rem;
  background-color: #06113C;
  .button-container{
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    gap:1rem;
    .emoji{
      position:relative;
      svg{
        color:#FBDF07;
        font-size:1.5rem;
        cursor:pointer;
      }
    }
    .emoji-picker-react{
      position:absolute;
      top: -350px;
      background-color:#3F3697;
      box-shadow:0 5px 10px #06113C;
      .emoji-scroll-wrapper::-webkit-scrollbar{
        background-color: #3F3697;
        width:5px;
        &-thumb{
          background-color:#06113C;
        }
      }
      .emoji-categories{
        button{
          filter: contrast(0);
        }
      }
      .emoji-search{
        background-color:transparent;
        border-color:#06113C;
      }
      .emoji-group:before{
        background-color:#3F3697;
      }
      
    }
  }
  .input-container{
    width:100%;
    height:2.5rem;
    border-radius: 2rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    background-color: #3F3697;
    box-shadow:0 2px 2px #BBE1FA;
    input{
      width: 100%;
      background-color:transparent;
      color:white;
      border:none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: blue;
      }
      &:focus{
        outline:none;
      }
    }
    button{
      padding:0.4rem 1.7rem;
      border-radius:2rem;
      display:flex;
      align-items:center;
      justify-content:center;
      border:none;
      background-color: #1EAE98;
      cursor:pointer;
      svg{
        font-size:1.5rem;
        color:white;
      }

    }
  }
`
export default ChatInput;