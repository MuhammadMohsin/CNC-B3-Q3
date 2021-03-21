exports.createPages = async ({graphql, actions: {createPage}}) => {

    const response = await graphql(`
        query {
            allContentfulMobile {
                edges {
                node {
                    desc {
                    raw
                    }
                    title
                    slug
                    contentful_id
                }
                }
            }
        }
`)

    console.log(JSON.stringify(response?.data?.allContentfulMobile?.edges));

    const productList = response?.data?.allContentfulMobile?.edges

    productList.forEach(({node}) => createPage({
        path: `/${node.slug}`,
        component: require.resolve("./src/templates/product-details.js"),
        context: {
            title: `${node.title}`,
            desc: `${node.desc.raw}`
        },
    }))
}