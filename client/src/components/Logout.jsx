import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import styled from 'styled-components';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <Button onClick={handleLogout}>
            <ImExit />
        </Button>
    );
}

const Button = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0.5rem;
    border-radius:0.5rem;
    border:none;
    background-color: #EFEFEF;
    cursor:pointer;
    svg{
        font-size: 1.3rem;
        color: #F66B0E;
    }

`

export default Logout;