import React, { useState, useEffect, useContext } from 'react'
import Layout from '../shared/components/Layout'
import Landing from '../shared/home/Landing'
import Videos from '../shared/videos'
import defaultTheme, { NavbarTheme, defaultNavbar } from '../shared/theme'
import { CMSContext } from '../context/CMSContext'

const noScrollNavBarTheme: NavbarTheme = {
    type: 'noScroll',
    main: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none',
    amplifyLogo: 'light',
    amplifyText: '#ffffff',
    textColor: '#ffffff',
    textHoverColor: '#ffffff',
    searchBgColor: 'rgba(0, 0, 0, 0)',
    searchMainColor: '#ffffff',
    searchHoverMainColor: '#000000',
    searchHoverBgColor: '#ffffff',
    contrastText: 'var(--amplify-primary-contrast)',
}

const HomePage = () => {
    const [theme, setTheme] = useState({
        ...defaultTheme,
        palette: {
            ...defaultTheme.palette,
            navbar: noScrollNavBarTheme,
        },
    })
    const apiContext = useContext(CMSContext)

    const handleScroll = () => {
        if (window.pageYOffset > 20 && theme.palette.navbar.type !== 'scroll') {
            setTheme({
                ...theme,
                palette: {
                    ...theme.palette,
                    navbar: defaultNavbar,
                },
            })
        }
        if (
            window.pageYOffset <= 20 &&
            theme.palette.navbar.type !== 'noScroll'
        ) {
            setTheme({
                ...theme,
                palette: {
                    ...theme.palette,
                    navbar: noScrollNavBarTheme,
                },
            })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <Layout overrideTheme={theme} removePaddingTop>
            <CMSContext.Provider value={apiContext}>
                <Landing />
                <Videos />
            </CMSContext.Provider>
        </Layout>
    )
}

export default HomePage
