import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link as GatsbyLink } from 'gatsby'
import { NavbarTheme } from '../../theme'

type SearchTextProps = {
    hover: boolean
    theme: NavbarTheme
}

type SearchProps = {
    to: string
    theme: NavbarTheme
    dropdownmode: boolean
}

const SearchWrapper = styled.div<{ dropdownmode: boolean }>`
    display: flex;
    align-items: center;
    margin-left: ${({ dropdownmode }) => (dropdownmode ? 0 : '20px')};
`

const SearchText = styled.span<SearchTextProps>`
    color: ${(props) =>
        props.hover
            ? props.theme.searchHoverMainColor
            : props.theme.searchMainColor};
    transition: 0.2s;
    margin-left: 10px;
    font-size: 16px;
`

const SearchButton = styled(GatsbyLink)`
    text-decoration: none;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    border: 2px solid ${(props) => props.theme.searchMainColor};
    background-color: ${(props) => props.theme.searchBgColor};
    cursor: pointer;
    border-radius: 20px;
    transition: 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.searchHoverBgColor};
        border: 2px solid ${(props) => props.theme.searchHoverBgColor};
    }
`

const Search = ({ to, theme, dropdownmode }: SearchProps) => {
    const [hover, setHover] = useState(false)

    return (
        <SearchWrapper dropdownmode={dropdownmode}>
            <SearchButton
                theme={theme}
                to={to}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
            >
                <AiOutlineSearch
                    style={{ transition: '0.2s' }}
                    size={20}
                    color={
                        hover
                            ? theme.searchHoverMainColor
                            : theme.searchMainColor
                    }
                />
                <SearchText hover={hover} theme={theme}>
                    Search
                </SearchText>
            </SearchButton>
        </SearchWrapper>
    )
}

export default Search
