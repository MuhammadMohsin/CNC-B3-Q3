exports.createPages = ({ actions: { createPage } }) => {

    const productList = [
        {
            id: "p1",
            title: "Product 1",
            desc: "This is product 1 desc"
        },
        {
            id: "p2",
            title: "Product 2",
            desc: "This is product 2 desc"
        },
        {
            id: "p3",
            title: "Product 3",
            desc: "This is product 3 desc"
        }
    ]

    productList.forEach((productObj) => createPage({
        path: `/${productObj.id}`,
        component: require.resolve("./src/templates/product-details.js"),
        context: {
            title: `${productObj.title}`,
            desc: `${productObj.desc}`
        },
    }))
}