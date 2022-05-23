import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import LayoutModal from '../LayoutModal';
import FormDelegate from '../forms/FormDelegate';
import useShowModal from '../../hooks/useShowModal';
import { capitalizeLetters, convertIntToMutez } from '../../utils/helpers';
import useStargateSDK from '../../hooks/useStargateSDK';
import useApi from '../../hooks/useApi';
import { useKepler } from '../../store';
import styled from 'styled-components';

const BtnDelegation = styled(Button)`
    color: ${({ theme }) => theme.main};

    &:hover {
        color: ${({ theme }) => theme.lightGreen};
    }
`;

type TDelegationProps = {
    data: any;
};

const Stake: FC<TDelegationProps> = (props) => {
    const { data } = props;
    const { show, handleShow, handleClose } = useShowModal();

    return (
        <>
            <BtnDelegation variant="outline-primary" onClick={handleShow}>
                Delegation
            </BtnDelegation>

            <LayoutModal handleClose={handleClose} show={show} title={'Stake'}>
                <FormDelegate handleClose={handleClose} data={data} />
            </LayoutModal>
        </>
    );
};

export default Stake;
