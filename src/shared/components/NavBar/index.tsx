import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Menu from './Menu'
import { NavbarTheme } from '../../theme'
import { useWindowDimensions } from '../../hooks'
import LogoDark from '../../../assets/logo/trackit-colored.svg'
import LogoLight from '../../../assets/logo/trackit-white.svg'
import { screenSizes } from '../../constants'

const Header = styled.header`
    box-sizing: border-box;
    margin: 0;
    display: flex;
    align-items: center;
    padding: 0 50px;
    background-size: 100% 100%;
    background-position: top left;
    background-repeat: no-repeat;
    ${({ theme }) =>
        theme.amplifyLogo !== 'light'
            ? `background-color: ${theme.main};`
            : `background-image: linear-gradient(to bottom, var(--trackflix-background-color), transparent);`}
    box-shadow: ${(props) =>
        props.minHeight === props.height ? props.theme.boxShadow : 0};
    justify-content: space-between;
    height: ${(props) => props.height}px;
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    transition: box-shadow 200ms, background-color 200ms;
`

const LogoLink = styled.a`
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 100%;
`

const LogoText = styled.span`
    color: ${(props) => props.theme.amplifyText};
    margin-left: 20px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 10px;
`

type NavBarProps = {
    navbarTheme: NavbarTheme
    onHeightChange: (height: number) => void
    maxHeight?: number
    minHeight?: number
}

const NavBar = ({
    navbarTheme,
    onHeightChange,
    maxHeight = 110,
    minHeight = 76,
}: NavBarProps) => {
    const { height, width } = useWindowDimensions()
    const [navBarHeight, setNavBarHeight] = useState(maxHeight)

    const handleScroll = () => {
        const computedHeight = maxHeight - window.pageYOffset
        computedHeight < minHeight
            ? setNavBarHeight(minHeight)
            : setNavBarHeight(computedHeight)
    }

    useEffect(() => {
        onHeightChange(navBarHeight)
    }, [navBarHeight])

    useEffect(() => {
        handleScroll()
        window.removeEventListener('scroll', handleScroll)
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [height])

    return (
        <Header
            id="video-community-header"
            theme={navbarTheme}
            height={navBarHeight}
            minHeight={minHeight}
        >
            <LogoLink href="/">
                {navbarTheme.amplifyLogo === 'light' ? (
                    <LogoLight
                        height={(navBarHeight - 10) / 2}
                        width={navBarHeight / 2}
                    />
                ) : (
                    <LogoDark
                        height={(navBarHeight - 10) / 2}
                        width={navBarHeight / 2}
                    />
                )}

                {width > screenSizes.xs && (
                    <LogoText theme={navbarTheme}>TRACKFLIX</LogoText>
                )}
            </LogoLink>
            <Menu
                navbarTheme={navbarTheme}
                navBarHeight={navBarHeight}
                minHeight={minHeight}
            />
        </Header>
    )
}

export default NavBar
