import React from 'react';
import styled from 'styled-components';
import WelcomeRobo from '../assets/robot.gif';
import Logout from './Logout';

const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <div className="header">
                <Logout/>
            </div>
            <img src={WelcomeRobo} alt="welcome" />
            <h2>Welcome, <span>{currentUser ? currentUser.username : "Buddy"}!</span></h2>
            <h3>Please select a chat to start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    color: white;
    img{
        height:25rem;
    }
    span{
        color:#1CD6CE;
    }
    .header{
        padding: 1rem 2rem;
        display:flex;
        flex-direction:column;
        position:absolute;
        left: 85%;
        @media screen and (min-width: 720px) and (max-width: 1080px){{
            position:absolute;
            left: 80%;
        }
        @media screen and (min-width: 480px) and (max-width: 720px){{
            position:absolute;
            left: 50%;

        }
    }

`
export default Welcome;