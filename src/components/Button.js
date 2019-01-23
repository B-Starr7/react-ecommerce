import styled from 'styled-components';

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    border: none;
    padding:  .25em .75em;
    transition: all .25s linear;
    &:hover {
        background: var(--lightBlue);
        color: var(--mainWhite);
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`