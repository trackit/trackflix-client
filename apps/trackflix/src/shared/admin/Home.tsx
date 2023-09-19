import React from 'react'
import { Card, CardContent, CardHeader, Link } from '@material-ui/core'
import styled from 'styled-components'

const StyledIt = styled.span`
    color: #d9594d !important;
`

const StyledLink = styled(Link)`
    font-size: 20px;
    color: #000000 !important;

    &:hover {
        text-decoration: underline !important;
    }
`

const Home = () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
            This website has been Made by{' '}
            <StyledLink href="https://trackit.io">
                Track<StyledIt>It</StyledIt>
            </StyledLink>
        </CardContent>
    </Card>
)

export default Home
