import { useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify'; // For warning
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
}


const ClearMessages = ({ clearChatMessages, messages }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleClearChatMessages = (e) => {
        e.preventDefault();
        toast.warning("Your chat is deleted!", toastOptions);
        clearChatMessages();
    }

    const ClearChatModal = () => {
        return (
            <div className="modal-container">
                <button
                    onClick={handleClearChatMessages}
                    disabled={messages.length === 0} >
                    Clear chat
                </button>
            </div>
        );
    }
    return (
        <>
            <Container>
                <BiDotsVertical onClick={handleToggleModal} />
                {isModalOpen && <ClearChatModal />}
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0.5rem;
    font-size:1.5rem;
    color:#F66B0E;
    .modal-container{
        @media screen and (min-width: 720px) and (max-width: 1080px){
          padding:1rem;
          font-size:0.5rem;
          width:10vw;
          height:7vh;
        }
        @media screen and (min-width: 480px) and (max-width: 720px){
          padding:1rem;
          font-size:0.5rem;
          width:10vw;
          height:7vh;
        }
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        width:7vw;
        height:5vh;
        position:absolute;
        top: 150px;
        box-shadow:0 5px 10px #06113C;
        button{
            cursor:pointer;
            font-size:1rem;
            color:#EFEFEF;
            background-color:transparent;
            border:none;
        }
    }
`

export default ClearMessages;