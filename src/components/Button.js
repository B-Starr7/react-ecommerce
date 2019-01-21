import styled from 'styled-components';

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    border: none;
    padding:  .25em .75em;
    &:hover {
        background: var(--lightBlue);
        color: var(--mainWhite);
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`