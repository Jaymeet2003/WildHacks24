import Backgroundlogin from './backgroundlogin.png'; // Make sure to import your background image
import styled from 'styled-components';
import React from 'react';

function Background (){
    return(
        <ImStyled> 
            <img src={Backgroundlogin} alt="Backgroundlogin" />
        </ImStyled>
    )
}


const ImStyled = styled.div`
    img {
        position: fixed;
        top: 100px;
        left: 0;
        width: 100%;
        height: calc(100vh - 100px);
        z-index: -1; // Ensure the background is behind the content
        

    }
`;

export default Background;
