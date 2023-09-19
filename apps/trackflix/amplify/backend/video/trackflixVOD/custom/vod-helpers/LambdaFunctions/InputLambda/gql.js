const queries = {
    UpdateVideoOnDemand: /* GraphQL */ `
    mutation UpdateVideoOnDemand(
      $input: UpdateVideoOnDemandInput!
      $condition: ModelVideoOnDemandConditionInput
    ) {
      updateVideoOnDemand(input: $input, condition: $condition) {
        id
        src
        metadata
        createdAt
        updatedAt
      }
    }
  `
}

module.exports = queries
