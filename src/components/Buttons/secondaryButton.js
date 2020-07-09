import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: white;
    color: var(--darkGrey);
    border-radius: 3px;
    border: 1px solid var(--darkGrey);
    padding: 15px 20px;
    font-size: 18px;
    width: 100%;
    transition: all .2s ease;
    &:hover{
        cursor: pointer;
        color: black;
        border: 1px solid black;
    }
`
export default function SecondaryButton({onClick, children}){
    return <StyledButton onClick={onClick}>
        {children}
    </StyledButton>
}