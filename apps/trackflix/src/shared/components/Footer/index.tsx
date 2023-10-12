import React from 'react'
import styled from 'styled-components'
import LandingLink from '../Button/Link'
import { screenSizes } from '../../constants'

const Container = styled.div`
    padding: 0 50px;
`

const ContentWrapper = styled.div`
    padding: 50px;
    display: flex;
    gap: 50px;

    @media (max-width: ${screenSizes.m}px) {
        flex-direction: column;
        padding: 10px;
    }
`

const Content = styled.div<ContentProps>`
    flex: 1;
`

const ContentTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 50px 0;
`

const ContentText = styled.p`
    font-size: 18px;
    color: #ffffff;
    margin: 0 0 50px 0;
`

const StyledContentLink = styled.a`
    display: flex;
    font-size: 18px;
    color: #ffffff;
    margin: 0 0 10px 0;
    text-decoration: none;
    width: 220px;
`

const Divideur = styled.div`
    margin-top: 20px;
    border: 1px solid #e5e5e5;
    width: 100%;
`

const InfoContainer = styled.div`
    padding: 10px 0;
    display: flex;
    justify-content: center;
`

const InfoLink = styled.a`
    font-size: 12px;
    color: #ffffff;
    font-weight: 600;
    margin: 0 5px;
    text-decoration: none;
`

const NormalText = styled.p`
    font-size: 12px;
    color: #ffffff;
    margin: 0 5px;
`

const BoldLink = styled.a`
    font-weight: 600;
    margin: 0;
    text-decoration: none;
    color: #ffffff;
`

const UsefulLinks = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
`

const TrackitLogo = styled.img`
    margin-bottom: 35px;
`

type ContentLinkProps = {
    href: string
    text: string
}

const ContentLink = ({ href, text }: ContentLinkProps) => (
    <StyledContentLink target="__blank" href={href}>
        {text}
    </StyledContentLink>
)

const Footer = () => (
    <Container>
        <ContentWrapper>
            <Content>
                <TrackitLogo src="https://trackit.io/wp-content/uploads/2017/10/footer-logo.png" />
                <ContentText>
                    AWS Advanced Consulting Partner - Cloud Management,
                    Consulting, and Software Development Solutions
                </ContentText>
                <LandingLink
                    redirection="https://trackit.io"
                    primaryColor="#ffffff"
                    secondaryColor="#242f3e"
                    text="TrackIt - Cloud Consulting"
                />
            </Content>
            <Content>
                <ContentTitle>Our services</ContentTitle>
                <ContentText>
                    From optimizing your cloud experience to delivering
                    infrastructure as code, or creating standalone software, we
                    have the experience and capabilities to provide customized
                    solutions tailored to your needs.
                </ContentText>
                <LandingLink
                    redirection="https://github.com/trackit"
                    primaryColor="#ffffff"
                    secondaryColor="#242f3e"
                    text="GitHub Repository"
                />
            </Content>
            <Content>
                <ContentTitle>Useful links</ContentTitle>
                <UsefulLinks>
                    <ContentLink
                        href="https://trackit.io/about-us/"
                        text="About Us"
                    />
                    <ContentLink
                        href="https://trackit.io/request-free-trial/"
                        text="Contact us"
                    />
                    <ContentLink
                        href="https://trackit.io/services/"
                        text="Our services"
                    />
                    <ContentLink
                        href="https://aws.amazon.com/marketplace/search/?CREATOR=b9e05e1d-4e48-4814-b869-b911eb51e288&filters=CREATOR"
                        text="AWS Marketplace"
                    />
                </UsefulLinks>
            </Content>
        </ContentWrapper>
        <Divideur />
        <InfoContainer>
            <InfoLink target="__blank" href="/terms">
                Site Terms
            </InfoLink>
            <InfoLink target="__blank" href="/privacy">
                Privacy
            </InfoLink>
            <NormalText>
                © 2021 Trackit, Inc. or its affiliates. All rights reserved.
            </NormalText>
            <NormalText>
                Created by{' '}
                <BoldLink href="https://trackit.io/" target="__blank">
                    TrackIt
                </BoldLink>
            </NormalText>
        </InfoContainer>
    </Container>
)

export default Footer
