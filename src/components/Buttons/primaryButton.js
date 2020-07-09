import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: black;
    color: white;
    border-radius: 3px;
    border: 1px solid black;
    padding: 15px 20px;
    font-size: 18px;
    width: 100%;
    transition: all .2s ease;
    &:hover{
        cursor: pointer;
        color: var(--grey);
        background-color: #464646;
    }
`
export default function PrimaryButton({onClick, children}){
    return <StyledButton onClick={onClick}>
        {children}
    </StyledButton>
}