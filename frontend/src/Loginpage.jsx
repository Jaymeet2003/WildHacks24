import React from 'react';
import styled from 'styled-components';

function LoginPage() {
    return (
        <LoginPageStyled>
            <Ribbon>
                <Logo src="/logo.png" alt="Logo" />
                <LoginButton>Login</LoginButton> {/* Moved LoginButton here for upper right positioning */}
            </Ribbon>
            <MainContent>
                <AboutParagraph>Finance Guru is the ultimate web app for young adults diving into finance, blending an easy expense tracker with a sleek stock portfolio tracker. With features like savings battles, reward-earning quizzes, and clear financial visuals, it turns money management into a fun, engaging journey. The highlight? A retirement planning tool that reveals the magic of investing over saving. Finance Guru isn’t just an app; it’s your first step towards financial savvy and freedom.</AboutParagraph>
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
`;

const Ribbon = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #FCF6F9;
    padding: 10px 20px; // Adjust padding for aesthetic
    display: flex;
    justify-content: space-between; // Adjusts content to each end
    align-items: center;
    box-sizing: border-box;
`;

const Logo = styled.img`
    /* Logo styles remain unchanged */
    margin-left: 20px;
    width: 100px;
    height: auto;
`;

const LoginButton = styled.button`
    /* LoginButton styles modified for the upper right position */
    background: var(--color-primary, #f00);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background: var(--color-primary-dark, #c00);
    }
`;

const MainContent = styled.div`
    /* MainContent adjusted to center the AboutParagraph */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    width: 80%; // Controls width of the content for better readability
`;

const AboutParagraph = styled.p`
    /* AboutParagraph styles remain largely unchanged, ensuring it's centered */
    color: #666;
    text-align: center;
`;

export default LoginPage;
