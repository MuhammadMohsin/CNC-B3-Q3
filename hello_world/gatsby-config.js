module.exports = {
    plugins: [
        `gatsby-plugin-material-ui`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
              spaceId: `86n3wf5if3my`,
              // Learn about environment variables: https://gatsby.dev/env-vars
              accessToken: "IsqJojF6FhPxYiiMRS2M2VEWxt6Jy8O1hcH1Vy4Wky0",
            },
          },
    ]
}