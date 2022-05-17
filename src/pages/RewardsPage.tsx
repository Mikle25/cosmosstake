import React from 'react';
import { Tab, Tabs as BTabs } from 'react-bootstrap';
import styled from 'styled-components';

const Tabs = styled(BTabs)`
    margin-bottom: 20px;
    .nav-link {
        color: ${({ theme }) => theme.white};
        font-weight: 500;
        font-size: ${({ theme }) => theme.fs18};

        &.active {
            background-color: ${({ theme }) => theme.blue.b30};
        }

        &:hover {
            background-color: ${({ theme }) => theme.blue.b20};
            color: ${({ theme }) => theme.blue.b70};
        }
    }
`;

const RewardsPage = () => {
    return (
        <div>
            {/*<Tabs defaultActiveKey="delegation" id="uncontrolled-tab-example">*/}
            {/*    <Tab eventKey="delegation" title="My delegation">*/}
            {/*        <Delegations />*/}
            {/*    </Tab>*/}
            {/*    <Tab eventKey="rewards" title="My rewards">*/}
            {/*        <Rewards />*/}
            {/*    </Tab>*/}
            {/*    <Tab eventKey="unbonding" title="Unbonding delegations">*/}
            {/*        <UnbondingDelegations />*/}
            {/*    </Tab>*/}
            {/*</Tabs>*/}
            Stats rewards
        </div>
    );
};

export default RewardsPage;
