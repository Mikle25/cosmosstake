import React from 'react';
import Tbl from '../styled/Tbl';

type TRow = {
    row: any;
    cols: any;
    index: number;
};

const Row = ({ row, cols, index }: TRow) => {
    return (
        <Tbl.Tr>
            {cols.map((col: any) =>
                col.key === 'rank' ? (
                    <Tbl.Td key={col.key}>{index}</Tbl.Td>
                ) : (
                    <Tbl.Td key={col.key}>
                        {col.process ? col.process(row) : ''}
                    </Tbl.Td>
                ),
            )}
        </Tbl.Tr>
    );
};

export default Row;
