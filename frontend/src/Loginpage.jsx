import React from 'react';
import styled from 'styled-components';
//import backgroundImage from './backgroundlogin.png'; // Make sure to import your background image
import Background from './background.jsx'; // Make sure to import your background component
function LoginPage() {
    return (
        <LoginPageStyled>
            <Ribbon>
                <Logo src="/logo.png" alt="Logo" />
                <LoginButton>Login</LoginButton>
            </Ribbon>
            <MainContent>
                <Background />
                <AboutParagraph>Finance Guru is the go-to web app for young adults stepping into the world of finance, transforming money management into an adventure. Packed with a slick expense tracker, engaging quizzes, clear financial insights, dynamic stock portfolio tracker, and a retirement planner, which makes finance fun and interactive. Stand out with the Savings Battle, a feature that showcases the power of investing. Finance Guru is more than just a tool; it's your launchpad to financial freedom and mastery in the fast-paced productivity race.</AboutParagraph>
            </MainContent>
        </LoginPageStyled>
    );
}

const LoginPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
 
    background-size: cover; // Ensure the background covers the entire viewport
`;

const Ribbon = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #FCF6F9;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2; // Ensure the ribbon is above the background
`;

const Logo = styled.img`
    margin-left: 20px;
    width: 125px;
    height: auto;
`;

const LoginButton = styled.button`
    background: var(--color-primary, #f00);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        background: var(--color-primary-dark, #c00);
    }
`;

const MainContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 100%; // Adjusted to fill the width
    font weight: bold;
`;

const AboutParagraph = styled.p`
    color: 	#000000;
    text-align: center;
    type: helvetica;
    width: 80%; // Adjusted for better readability
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    backdrop-filter: blur(20px); // Add a blur effect to the background
    font-weight: bold;
`;

export default LoginPage;
