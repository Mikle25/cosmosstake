import { useState } from 'react';
import { useKepler } from '../store';
import { DeliverTxResponse } from '@cosmjs/stargate';

export interface TrxResp {
    trx: string;
    linkTrx: string;
    handleLink?: (hash: string) => void;
}

const useGetExplorerTrx = () => {
    const { chain } = useKepler();
    const [trx, setTrx] = useState<string>('');
    const [linkTrx, setLinkTrx] = useState<string>('');
    const [statusCode, setStatusCode] = useState(false);

    const handleLink = (props: DeliverTxResponse) => {
        setTrx(props.transactionHash);
        setStatusCode(props.code === 0);
        setLinkTrx(`${chain.explorer}/txs/${props.transactionHash}`);
    };

    return {
        trx,
        handleLink,
        linkTrx,
        statusCode,
    };
};

export default useGetExplorerTrx;
