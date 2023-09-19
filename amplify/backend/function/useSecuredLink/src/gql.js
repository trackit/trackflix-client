const queries = {
    GetSecuredLink: /* GraphQL */ `
        query GetSecuredLink($id: ID!) {
            getSecuredLink(id: $id) {
                id
                mediaID
                usagesRemaining
                expirationUnixTime
                notifiedEmail
                createdAt
                updatedAt
                media {
                    id
                    title
                    description
                    highlighted
                    source
                    author
                    viewCount
                    createdAt
                    updatedAt
                    thumbnail {
                        id
                        ext
                        src
                        createdAt
                        updatedAt
                    }
                    sections {
                        nextToken
                    }
                }
            }
        }
    `,
    DeleteSecuredLink: /* GraphQL */ `
        mutation DeleteSecuredLink(
            $input: DeleteSecuredLinkInput!
            $condition: ModelSecuredLinkConditionInput
        ) {
            deleteSecuredLink(input: $input, condition: $condition) {
                id
                mediaID
                usagesRemaining
                notifiedEmail
                createdAt
                updatedAt
                media {
                    id
                    title
                    description
                    highlighted
                    source
                    author
                    viewCount
                    createdAt
                    updatedAt
                    thumbnail {
                        id
                        ext
                        src
                        createdAt
                        updatedAt
                    }
                    sections {
                        nextToken
                    }
                }
            }
        }
    `,
    UpdateSecuredLink: /* GraphQL */ `
        mutation UpdateSecuredLink(
            $input: UpdateSecuredLinkInput!
            $condition: ModelSecuredLinkConditionInput
        ) {
            updateSecuredLink(input: $input, condition: $condition) {
                id
                mediaID
                usagesRemaining
                notifiedEmail
                createdAt
                updatedAt
                media {
                    id
                    title
                    description
                    highlighted
                    source
                    author
                    viewCount
                    createdAt
                    updatedAt
                    thumbnail {
                        id
                        ext
                        src
                        createdAt
                        updatedAt
                    }
                    sections {
                        nextToken
                    }
                }
            }
        }
    `,
}

module.exports = queries
