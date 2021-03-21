import {graphql, Link} from "gatsby";
import React from "react";
import Layout from "../components/layout";

const ProductPage = ({data}) => {

  const productList = data?.allContentfulMobile?.edges;

  console.log(productList)
  return <Layout>
    <h1>This is my Product page</h1>

    {
      productList.map(({node}) => <div key={node.contentful_id}>
        <Link to={`/${node.slug}`}>
          <h2> {node?.title}</h2>
        </Link>
      </div>)
    }
  </Layout>
}


export const query = graphql`
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
`
export default ProductPage;