import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate, PageProps } from 'gatsby'
import Layout from '../../shared/components/Layout'
import { useSecuredLink } from '../../shared/api/mutate'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SecuredLinkPage = (props: PageProps) => {
    const securedLinkId = props.params.id
    const [hasExpired, setHasExpired] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                const result = await useSecuredLink(securedLinkId)
                if (result.statusCode == 404) {
                    setHasExpired(true)
                    return
                }

                window.location.replace(result.body)
            } catch {
                setHasExpired(true)
            }
        })()
    }, [])

    useEffect(() => {
        if (hasExpired) setTimeout(() => navigate('/'), 5000)
    }, [hasExpired])

    return (
        <Layout>
            <Container>
                {!hasExpired ? (
                    <h1>The download is starting...</h1>
                ) : (
                    <h1>The link has expired</h1>
                )}
            </Container>
        </Layout>
    )
}

export default SecuredLinkPage
