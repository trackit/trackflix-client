import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { Auth } from 'aws-amplify'
import { useLocation } from '@reach/router'

import UserIconLight from '../../../assets/logo/user-light.svg'
import UserIconDark from '../../../assets/logo/user-dark.svg'
import LogoutIconLight from '../../../assets/logo/power-light.svg'
import LogoutIconDark from '../../../assets/logo/power-dark.svg'

const LoginButton = styled.div`
    margin-left: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    height: 40%;
    border: 2px solid #ffffff;
    border-radius: 100%;
    transition: background-color 200ms ease-in-out, border 200ms ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: ${({ light }) =>
            light ? '#ffffff' : 'var(--trackflix-primary-color)'};
        ${({ light }) =>
            !light && 'border: 2px solid var(--trackflix-primary-color)'}
    }
`

const Label = styled.div`
    position: absolute;
    top: 80%;
    background-color: #212121;
    color: #ffffff;
    padding: 10px;
    border-radius: 5px;
    opacity: 0.9;
`

const DropdownButton = styled.div`
    color: #ffffff;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const UserMenu = ({ navbarTheme, dropdownmode }) => {
    const [hovered, setHovered] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const location = useLocation()

    const updateAuthState = () => {
        console.log('removed implementation of updateAuthState')
        // Auth.Credentials.get().then(() => {
        //     if (Auth.Credentials.getCredSource() === 'userPool') {
        //         setSignedIn(true)
        //     }
        // })
    }

    useEffect(updateAuthState, [])

    const displayButtonIcon = () => {
        if (signedIn) {
            if (navbarTheme.amplifyLogo === 'light' && hovered) {
                return <LogoutIconDark height="50%" />
            } else {
                return <LogoutIconLight height="50%" />
            }
        } else {
            if (navbarTheme.amplifyLogo === 'light' && hovered) {
                return <UserIconDark height="70%" />
            } else {
                return <UserIconLight height="70%" />
            }
        }
    }

    const handleClick = () => {
        // if (signedIn) {
        //     Auth.signOut()
        //     setSignedIn(false)
        //     window.location.reload(false)
        // } else {
        //     navigate('/login', {
        //         state: { redirectTo: location.pathname },
        //     })
        // }
    }

    if (dropdownmode && signedIn)
        return <DropdownButton onClick={handleClick}>Log out</DropdownButton>
    else if (dropdownmode)
        return <DropdownButton onClick={handleClick}>Log in</DropdownButton>
    return (
        <LoginButton
            light={navbarTheme.amplifyLogo === 'light'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            {displayButtonIcon()}
            {signedIn && hovered && <Label>Log out</Label>}
        </LoginButton>
    )
}

export default UserMenu
