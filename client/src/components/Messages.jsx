import React from 'react';
import styled from 'styled-components';

const Messages = ({ messages }) => {
  return (
    <Container>
      {
        messages && messages.map((message, idx) => {
          return (
            <div className={`message ${message.fromSelf ? "sended" : "received"}`} key={idx}>
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          )
        })
      }
    </Container>
  )
};

const Container = styled.div`
  color:white;
  padding: 1rem 2rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
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
      background-color:#7FBCD2;
    }
  }
  .received{
    justify-content:flex-start;
    .content{
      background-color:#16213E;
    }
  }
`
export default Messages