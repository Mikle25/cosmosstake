import styled from 'styled-components';
import { Modal as BModal } from 'react-bootstrap';

type ModalProps = {
    bg: string;
    color: string;
};

const Modal = styled(BModal)<ModalProps>`
    color: ${({ theme, color }) => color ?? theme.black};

    & .modal-content {
        background-color: ${({ theme, bg }) => bg ?? theme.white};
    }
`;

Modal.Body = styled(BModal.Body)`
    padding: 2rem 2.5rem 0;
`;

Modal.Title = styled(BModal.Title)`
    text-transform: uppercase;
`;

// Modal.Header = styled(BModal.Header)`
//     padding: 2rem 2.5rem 1rem;
//     border-bottom: none;
// `;

export default Modal;
