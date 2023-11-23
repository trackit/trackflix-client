import React, { useState } from 'react'
import styled from 'styled-components'
import HeaderLink from './Link'
import Search from './Search'
import Dropdown from '../Dropdown'
import { useWindowDimensions } from '../../hooks'
import { screenSizes } from '../../constants'

import MenuColored from '../../../assets/logo/menu-colored.svg'
import MenuWhite from '../../../assets/logo/menu-white.svg'

const RightItemsWrapper = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
`

const MenuContainer = styled.div<{ light: boolean }>`
    box-sizing: border-box;
    aspect-ratio: 1 / 1;
    border-radius: 7px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    transition: transform 200ms ease-in;

    &:hover {
        ${({ light }) => light && 'border: 1.5px solid #FFFFFF;'}
        ${({ light }) =>
            !light && 'border: 1.5px solid var(--trackflix-primary-color);'}
    }
`

interface MenuProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navbarTheme: any
    navBarHeight: number
    minHeight: number
}

const Menu = ({ navbarTheme, navBarHeight, minHeight }: MenuProps) => {
    const [hovered, setHovered] = useState(false)
    const { width } = useWindowDimensions()

    const dropdownmode = width <= screenSizes.m

    const ButtonsList = [
        <HeaderLink
            theme={navbarTheme}
            navBarHeight={navBarHeight}
            navBarMinHeight={minHeight}
            to="/"
            content="Home"
            key="home"
            dropdownmode={dropdownmode}
        />,
        <Search
            theme={navbarTheme}
            to="/search"
            key="search"
            dropdownmode={dropdownmode}
        />,
    ]

    if (dropdownmode)
        return (
            <Dropdown list={ButtonsList} height="45%">
                <MenuContainer
                    light={navbarTheme.amplifyLogo === 'light'}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {navbarTheme.amplifyLogo === 'light' || !hovered ? (
                        <MenuWhite height="80%" />
                    ) : (
                        <MenuColored height="80%" />
                    )}
                </MenuContainer>
            </Dropdown>
        )
    return <RightItemsWrapper>{ButtonsList}</RightItemsWrapper>
}

export default Menu
