import styled from 'styled-components';
import { Form as BForm } from 'react-bootstrap';

interface FormProps {
    variant: 'default';
}

const Form = styled(BForm)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

Form.Label = styled(BForm.Label)`
    margin: 0;

    & span {
        color: ${({ theme }) => theme.gray};
    }
`;

export const FormControl = styled(BForm.Control)`
    border: none;
    border-radius: 0;

    & {
        border-bottom: ${({ theme }) => theme.activeBorderNav};
        border-color: ${({ theme }) => theme.gray};

        &:focus {
            border-color: ${({ theme }) => theme.lightGreen};
        }
    }

    &:focus-visible,
    &:focus,
    &.is-invalid:focus {
        outline: none;
        box-shadow: none;
    }
`;

export const FormBtn = styled.span<Partial<FormProps>>`
    cursor: pointer;

    min-width: ${({ variant }) => {
        if (variant === 'default') return 'fit-content';
        return 'fit-content';
    }};
    padding: ${({ variant }) => {
        if (variant === 'default') return '5px';
        return '1rem';
    }};

    background: ${({ theme, variant }) => {
        if (variant === 'default') return theme.black;
        return theme.black;
    }};
    text-transform: uppercase;
    color: ${({ theme, variant }) => {
        if (variant === 'default') return theme.white;
        return theme.white;
    }};
    font-size: ${({ theme, variant }) => {
        if (variant === 'default') return theme.fs14;
        return theme.fs14;
    }};
`;

export default Form;
