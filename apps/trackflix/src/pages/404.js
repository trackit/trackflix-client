import React from 'react'
import Layout from '../shared/components/Layout'
import styled from 'styled-components'

const NotFoundContent = styled.div`
    display: flex;
    height: 65vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const Title = styled.h2`
    font-size: 4rem;
    font-weight: 800;
    line-height: 0.1rem;
    display: contents;
    color: #ffffff;
`

const SubTitle = styled.h4`
    font-size: 1.25rem;
    font-weight: 500;
    padding-bottom: 1.375rem;
    color: #ffffff;
`

const Link = styled.a`
    cursor: pointer;
    width: 16vh;
    max-width: 16vh;
    height: 4vh;
    background-color: #ffffff;
    color: var(--trackflix-background-color);
    border-radius: 5px;
    transition: background-color 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2vh;
    text-decoration: none;

    &:hover {
        background-color: rgba(255, 255, 255, 0.7);
    }
`

const NotFoundPage = () => {
    return (
        <Layout>
            <NotFoundContent>
                <Title>404</Title>
                <SubTitle>Page Not Found</SubTitle>
                <Link href="/">Return Home</Link>
            </NotFoundContent>
        </Layout>
    )
}

export default NotFoundPage
