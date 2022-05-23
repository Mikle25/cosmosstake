import styled from 'styled-components';
import { Table as BTable } from 'react-bootstrap';

const Tbl: any = styled(BTable)`
    margin-bottom: 0;
    text-align: center;
    color: ${({ theme }) => theme.main};

    & > :not(:first-child) {
        border-top: none;
    }

    & thead,
    tbody,
    tfoot,
    tr,
    td,
    th {
        border-style: none;
    }
`;

Tbl.Tr = styled.tr`
    height: ${({ h }: any) => h || '40px'};
    vertical-align: middle;
`;

Tbl.Th = styled.th`
    font-size: ${({ theme }) => theme.fs14};
    text-transform: uppercase;
    color: ${({ theme }) => theme.table.th};
`;

Tbl.THead = styled.thead`
    width: 100%;
    position: sticky;
    top: 0;
    backdrop-filter: blur(5px);
    background: transparent;
`;

Tbl.TBody = styled.tbody`
    border-color: transparent;

    & > tr:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

Tbl.Td = styled.td`
    text-align: center;
`;

export default Tbl;
