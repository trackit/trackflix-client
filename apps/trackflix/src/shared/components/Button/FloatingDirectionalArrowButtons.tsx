import React from 'react'
import styled from 'styled-components'
import { CustomArrowProps } from 'react-slick'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const StyledArrow = styled.div`
    display: flex;
    position: absolute;
    cursor: pointer;
    width: 100px;
    max-width: 20%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    z-index: 6;
    font-size: 25px;
    transition: background-image 100ms, font-size 100ms;

    & svg {
        transition: color 300ms;
    }

    &:hover {
        & svg {
            color: ${(props) => props.theme.palette.primary.main};
        }
        font-size: 35px;
    }
`

const StyledNextArrow = styled(StyledArrow)`
    right: 0;
    background-image: linear-gradient(
        to right,
        transparent,
        var(--trackflix-background-color)
    );
    &:hover {
        background: linear-gradient(to right, transparent, #000000);
    }
`

const NextArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledNextArrow onClick={onClick}>
            <FaArrowRight />
        </StyledNextArrow>
    )
}

const StyledPrevArrow = styled(StyledArrow)`
    left: 0;
    background: linear-gradient(
        to left,
        transparent,
        var(--trackflix-background-color)
    );
    &:hover {
        background: linear-gradient(to left, transparent, #000000);
    }
`

const PrevArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledPrevArrow onClick={onClick}>
            <FaArrowLeft />
        </StyledPrevArrow>
    )
}

export { NextArrow, PrevArrow }
