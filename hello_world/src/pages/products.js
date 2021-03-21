import {graphql} from "gatsby";
import React from "react";
import Layout from "../components/layout";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";

const ProductPage = ({data}) => {

  const productList = data?.allContentfulMobile?.edges;

  console.log(productList)
  return <Layout>
    <h1>This is my Product page</h1>

    {
      productList.map(({node}) => <div key={node.contentful_id}>
        <h2> {node?.title}</h2>
        <p> {node?.description}</p>
        {documentToReactComponents(
          JSON.parse(node.desc.raw)
        )}

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
        slug
        title
        contentful_id
      }
    }
  }
}
`
export default ProductPage;