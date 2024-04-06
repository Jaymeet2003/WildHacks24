import React from 'react'
import styled from 'styled-components'

import PropTypes from 'prop-types';

function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color,
        }} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    bg: PropTypes.string,
    bPad: PropTypes.string,
    color: PropTypes.string,
    bRad: PropTypes.string,
};

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;


export default Button