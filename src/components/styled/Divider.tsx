import styled from 'styled-components';

const Divider = styled.div`
    width: 100%;
    height: 3px;
    background: ${({ theme }) => theme.divider};
`;

export default Divider;
