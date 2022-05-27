import styled from 'styled-components';
import { Table as BTable } from 'react-bootstrap';

const WrapperTable = styled.div`
    margin: ${({ theme }) => `${theme.marginContainer}`};
`;

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
        text-transform: uppercase;
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

    &:first-child {
        text-align: start;
    }
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

    &:first-child {
        text-align: start;
        width: 30%;
    }
`;

export { Tbl, WrapperTable };
