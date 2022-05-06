import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useRoutes from './hooks/useRoutes';

const WrapperNav = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    font-size: ${({ theme }) => theme.fs20};
`;

const ListNav = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ConnectWallet = styled.div`
    width: 100%;
    text-align: end;
    padding-right: 50px;
    padding-bottom: ${({ theme }) => theme.paddingBHeader};
    border-bottom: ${({ theme }) => theme.defaultBorderNav};
`;

const CustomNavLink = styled(NavLink)`
    width: 240px;
    color: ${({ theme }) => theme.main};
    padding-bottom: ${({ theme }) => theme.paddingBHeader};
    border-bottom: ${({ theme }) => theme.defaultBorderNav};
    text-align: center;
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

            <ConnectWallet>Connect wallet</ConnectWallet>

            {/*<AppChainList />*/}
        </WrapperNav>
    );
};

export default AppHeaderNav;
