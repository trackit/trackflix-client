import React, { useState } from 'react'
import styled from 'styled-components'

const DropdownContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: ${({ height }) => height};
`

const ListContainer = styled.div`
    position: absolute;
    width: 200px;
    top: calc(100% + 10px);
    right: calc(100% - 70px);
    padding: ${({ height }) => (height === 0 ? 0 : '20px')} 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: #222222;
    border-radius: 7px;
    box-shadow: 0 4px 4px #222222;
    height: ${({ height }) => height}px;
    transition: height 100ms ease-out;
    overflow: hidden;
`

const ArrowContainer = styled.div`
    width: 300px;
    height: 20px;
    position: absolute;
    top: 100%;
    display: flex;
    justify-content: center;
`

const Arrow = styled.div`
    position: relative;
    bottom: 20px;
    border: 20px solid transparent;
    border-bottom: 20px solid #222222;
`

const ItemContainer = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 200ms ease-out;
    color: #ffffff;

    &:hover {
        background-color: #333333;
    }
`

const ScreenLayout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
`

const Dropdown = ({ children, height, list = [] }) => {
    const [displayList, setDisplayList] = useState(false)

    return (
        <>
            {displayList && (
                <ScreenLayout onClick={() => setDisplayList(false)} />
            )}
            <DropdownContainer
                onClick={() =>
                    displayList ? setDisplayList(false) : setDisplayList(true)
                }
                height={height}
            >
                {children}

                {list.length > 0 && displayList && (
                    <ArrowContainer>
                        <Arrow />
                    </ArrowContainer>
                )}
                <ListContainer height={displayList ? list.length * 50 : 0}>
                    {list.map(
                        (item, index) =>
                            item && (
                                <ItemContainer key={`dropdown_item_n_${index}`}>
                                    {item}
                                </ItemContainer>
                            )
                    )}
                </ListContainer>
            </DropdownContainer>
        </>
    )
}

export default Dropdown
