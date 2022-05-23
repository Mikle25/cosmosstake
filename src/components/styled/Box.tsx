import styled from 'styled-components';

type TBox = {
    color?: string;
    padding?: string;
};

const Box = styled.div<TBox>`
    padding: ${({ padding }) => padding ?? '0'};
`;

export default Box;
