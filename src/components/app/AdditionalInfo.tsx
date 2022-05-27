import React from 'react';
import styled, { useTheme } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SettingGear } from '../../assets/img/icons-additional-info/settings-gear.svg';
import { ReactComponent as Smiley } from '../../assets/img/icons-additional-info/smiley.svg';
import { ReactComponent as Repo } from '../../assets/img/icons-additional-info/repo.svg';
import { ReactComponent as ZoomIn } from '../../assets/img/icons-additional-info/zoom-in.svg';
import { ReactComponent as Comment } from '../../assets/img/icons-additional-info/comment.svg';
import { FlexWithGap } from '../styled/Flex';
import { useThemeToggle } from '../../hooks/useThemeContext';

const AdditionalInfoWrap = styled.div<{ themeName: string }>`
    display: flex;
    flex-direction: column;
    gap: 15px;

    & span {
        color: ${({ theme, themeName }) =>
            themeName === 'dark' ? theme.gray : theme.white};
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    & svg {
        width: 20px;
        height: 20px;
        fill: ${({ theme, themeName }) =>
            themeName === 'dark' ? theme.gray : theme.white};
    }
`;

const LinkWrap = styled(FlexWithGap)`
    transition: transform 1s linear;

    &:hover > div {
        transform: scale(1.2);
    }
`;

const LinkRoute = styled(NavLink)`
    &.active-link svg {
        fill: ${({ theme }) => theme.lightGreen};
    }
`;

const IconWrap = styled.div``;

const Links = [
    {
        name: 'Setting',
        path: '/setting',
        icon: <SettingGear />,
    },
    {
        name: 'About Us',
        path: '/about',
        icon: <Smiley />,
    },
    {
        name: 'FAQ',
        path: '/faq',
        icon: <Repo />,
    },
    {
        name: 'Cosmoscan',
        path: '/cosmoscan',
        icon: <ZoomIn />,
    },
    {
        name: 'Supported',
        path: '/support',
        icon: <Comment />,
    },
];

const AdditionalInfo = () => {
    const { themeName } = useThemeToggle();

    return (
        <AdditionalInfoWrap themeName={themeName}>
            {Links.map((elem, i) => (
                <LinkRoute
                    key={i}
                    to={elem.path}
                    exact
                    activeClassName="active-link"
                >
                    <LinkWrap gap="10px">
                        <IconWrap>{elem.icon}</IconWrap>
                        <span>{elem.name}</span>
                    </LinkWrap>
                </LinkRoute>
            ))}
        </AdditionalInfoWrap>
    );
};

export default AdditionalInfo;
