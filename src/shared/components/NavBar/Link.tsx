import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import { NavbarTheme } from '../../theme'

const InternalLink = styled(GatsbyLink)`
    text-decoration: none;
    padding: 0 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${(props) => props.theme.textColor};

    &:hover {
        color: ${(props) => props.theme.textHoverColor};
    }
`

const LinkText = styled.span`
    color: inherit;
`

const Item = styled.li<{ borderHeight: number; dropdownmode: boolean }>`
    display: flex;
    white-space: nowrap;
    cursor: pointer;
    border-bottom: 0 solid ${(props) => props.theme.textHoverColor};
    border-top: 0 solid rgba(0, 0, 0, 0);
    transition: border-bottom 100ms ease-out;
    box-sizing: content-box;
    ${({ dropdownmode }) => (dropdownmode ? 'flex: 1; height: 100%;' : '')}
    height: 100%;

    &:hover {
        ${(props) =>
            !props.dropdownmode
                ? `border-bottom: ${props.borderHeight}px solid
            ${props.theme.textHoverColor}`
                : ''};
        height: ${(props) => `calc(100% - ${props.borderHeight}px)`};
    }
`

const ExternalLink = styled.a`
    text-decoration: none;
    padding: 0 20px;
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    color: ${(props) => props.theme.textColor};

    &:hover {
        color: ${(props) => props.theme.textHoverColor};
    }
`

type HeaderLinkProps = {
    theme: NavbarTheme
    to: string
    content: string
    isExternal?: boolean
    navBarHeight: number
    dropdownmode: boolean
    navBarMinHeight: number
}

const HeaderLink = ({
    to,
    content,
    isExternal,
    theme,
    navBarHeight,
    navBarMinHeight,
    dropdownmode,
}: HeaderLinkProps) => {
    dropdownmode
    const borderHeight = (navBarHeight - navBarMinHeight) / 8 + 2
    if (isExternal)
        return (
            <Item
                theme={theme}
                borderHeight={borderHeight}
                dropdownmode={dropdownmode}
            >
                <ExternalLink
                    theme={theme}
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkText>{content}</LinkText>
                </ExternalLink>
            </Item>
        )
    return (
        <Item
            theme={theme}
            borderHeight={borderHeight}
            dropdownmode={dropdownmode}
        >
            <InternalLink to={to} theme={theme}>
                <LinkText>{content}</LinkText>
            </InternalLink>
        </Item>
    )
}

export default HeaderLink
