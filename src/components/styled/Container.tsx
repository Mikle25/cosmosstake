import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const CustomContainer = styled(Container)`
    margin: 0 auto;
    max-width: 1440px;

    @media (max-width: 1440px) {
        padding: 0;
    }
`;
