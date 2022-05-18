import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useRoutes from './hooks/useRoutes';
import { useKepler } from '../../store';
import ConnectWallet from '../wallet/ConnectWallet';

const WrapperNav = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    padding-top: 5px;
    font-size: ${({ theme }) => theme.fs16};
`;

const ListNav = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const CustomNavLink = styled(NavLink)`
    width: 240px;

    color: ${({ theme }) => theme.main};
    padding-bottom: ${({ theme }) => theme.paddingBHeader};
    border-bottom: ${({ theme }) => theme.defaultBorderNav};
    text-align: center;
    text-transform: uppercase;
    transition: ${({ theme }) => theme.transitionCustom('all')};

    &.active-link {
        color: ${({ theme }) => theme.headerNavLink};
        height: 100%;
        border-bottom: ${({ theme }) => theme.activeBorderNav};
        transition: ${({ theme }) => theme.transitionCustom('all')};
    }

    &:hover {
        color: ${({ theme }) => theme.headerNavLink};
    }
`;

const AppHeaderNav: FC = () => {
    const routes = useRoutes();

    return (
        <WrapperNav>
            <ListNav>
                {routes.map((route, i) => (
                    <CustomNavLink
                        key={i}
                        exact
                        to={route.path}
                        activeClassName="active-link"
                    >
                        {route.name}
                    </CustomNavLink>
                ))}
            </ListNav>

            <ConnectWallet />
        </WrapperNav>
    );
};

export default AppHeaderNav;
