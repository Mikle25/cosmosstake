import React from 'react';
import styled from 'styled-components';
import { useThemeToggle } from '../hooks/useThemeContext';

const CosmosWrap = styled.div<{ themeName: string }>`
    width: 400px;
    height: 400px;
    opacity: ${({ themeName }) => (themeName === 'dark' ? 0.2 : 0.5)};
`;

const Electron = styled.circle`
    fill: white;
    r: 20px;
`;

const Core = styled.circle`
    fill: white;
`;

const Orbit = styled.path`
    stroke: white;
    stroke-width: 15;
    shape-rendering: crispEdges;
`;

const Cosmos = () => {
    const { themeName } = useThemeToggle();
    return (
        <CosmosWrap themeName={themeName}>
            <svg
                viewBox="0 0 582 640"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Orbit
                    id="orbit-1"
                    d="M290.308 620C325.102 620 353.308 485.685 353.308 320C353.308 154.315 325.102 20 290.308 20C255.514 20 227.308 154.315 227.308 320C227.308 485.685 255.514 620 290.308 620Z"
                />

                <Orbit
                    id="orbit-2"
                    d="M550.115 470C567.512 439.868 465.295 348.283 321.808 265.44C178.32 182.598 47.897 139.868 30.5 170C13.103 200.132 115.32 291.717 258.808 374.56C402.295 457.402 532.718 500.132 550.115 470Z"
                />

                <Orbit
                    id="orbit-3"
                    d="M30.5 470C47.897 500.132 178.32 457.402 321.808 374.56C465.295 291.717 567.512 200.132 550.115 170C532.718 139.868 402.295 182.598 258.808 265.44C115.32 348.283 13.103 439.868 30.5 470Z"
                />

                <Core cx="290.308" cy="320" r="35" />

                <g id="electron-1" transform="translate(-209,-498)">
                    <Electron cx="209" cy="498" />

                    <animateMotion
                        xlinkHref="#electron-1"
                        attributeName="motion"
                        attributeType="XML"
                        additive="sum"
                        dur="10s"
                        repeatCount="indefinite"
                    >
                        <mpath xlinkHref="#orbit-1" />
                    </animateMotion>
                </g>

                <g id="electron-2" transform="translate(-69,-179)">
                    <Electron cx="69" cy="179" />

                    <animateMotion
                        xlinkHref="#electron-2"
                        attributeName="motion"
                        attributeType="XML"
                        additive="sum"
                        dur="9s"
                        repeatCount="indefinite"
                    >
                        <mpath xlinkHref="#orbit-2" />
                    </animateMotion>
                </g>

                <g id="electron-3" transform="translate(-406,-106)">
                    <Electron cx="406" cy="106" />

                    <animateMotion
                        xlinkHref="#electron-3"
                        attributeName="motion"
                        attributeType="XML"
                        additive="sum"
                        dur="6"
                        repeatCount="indefinite"
                    >
                        <mpath xlinkHref="#orbit-3" />
                    </animateMotion>
                </g>
            </svg>
        </CosmosWrap>
    );
};

export default Cosmos;
