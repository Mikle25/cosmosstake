import React from 'react';
import { Tbl } from '../styled/Tbl';
import Row from './Row';

type TTable = {
    cols: any[];
    rows: any[];
};

const Table = ({ cols, rows }: TTable) => {
    return (
        <>
            {!rows.length && !rows ? (
                <div>Not data</div>
            ) : (
                <Tbl>
                    <Tbl.THead>
                        <Tbl.Tr h="60px">
                            {cols.map((elem) => (
                                <Tbl.Th key={elem.key}>{elem.label}</Tbl.Th>
                            ))}
                        </Tbl.Tr>
                    </Tbl.THead>
                    <Tbl.TBody>
                        {rows.map((row, i) => (
                            <Row key={i} index={i + 1} row={row} cols={cols} />
                        ))}
                    </Tbl.TBody>
                </Tbl>
            )}
        </>
    );
};

export default Table;
