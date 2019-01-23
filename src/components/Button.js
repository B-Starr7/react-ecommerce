import styled from 'styled-components';

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    border: 1px solid var(--lightBlue);
    padding:  .45em .85em;
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